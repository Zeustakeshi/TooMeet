package com.toomeet.user.auth;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.google.gson.Gson;
import com.toomeet.user.auth.dto.*;
import com.toomeet.user.exceptions.BadRequestException;
import com.toomeet.user.exceptions.ConflictException;
import com.toomeet.user.exceptions.ForbiddenException;
import com.toomeet.user.exceptions.NotFoundException;
import com.toomeet.user.jwt.JwtService;
import com.toomeet.user.mail.MailService;
import com.toomeet.user.mail.OtpMail;
import com.toomeet.user.user.Profile;
import com.toomeet.user.user.User;
import com.toomeet.user.user.UserRepository;
import com.toomeet.user.user.UserRole;
import com.toomeet.user.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final Jedis jedis;
    private final Gson gson;
    private final OTPService otpService;
    private final MailService mailService;
    private final JwtService jwtService;


    public AuthenticationResponseDto register(UserRegisterDto dto) {
        // Check if the user already exists in the repository by email
        Optional<User> userOptional = userRepository.findByEmail(dto.getEmail());

        // If the user exists, throw a ConflictException with an appropriate message
        if (userOptional.isPresent()) throw new ConflictException("Email đã tồn tại");

        // Generate a random profileId for the user registration
        String profileId = NanoIdUtils.randomNanoId();

        // Hash the user's password before saving it
        String hashPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(hashPassword);

        final long otpExpiredTime = otpService.getExpiredTime();
        final long profileExpiredTime = otpExpiredTime * 5;


        // Save the user registration data to cache
        String registerJson = gson.toJson(dto);
        jedis.set(profileId, registerJson);
        jedis.pexpire(profileId, profileExpiredTime);

        // Generate and cache OTP (One Time Password)
        String otp = otpService.generateOTP();
        String otpId = otpService.cacheOtp(otp, otpExpiredTime);

        // Send OTP to the user's email address
        otpService.sendOtp(dto.getEmail(), OtpMail
                .builder()
                .subject("Xác minh tài khoản TooMeet")
                .message("Mã xác thực của bạn là: " + otp)
                .build());


        return AuthenticationResponseDto.builder()
                .otpId(otpId)
                .profileId(profileId)
                .expiredIn(otpExpiredTime)
                .build();
    }

    public ResendOtpResponseDto resendOtp(String preOtpId, String profileId) {
        String profileJson = jedis.get(profileId);

        if (profileJson == null) {
            throw new BadRequestException("Gửi OTP thất bại :: thông tin không hợp lệ!");
        }

        UserRegisterDto profile = gson.fromJson(profileJson, UserRegisterDto.class);

        long newExpiredTime = otpService.getExpiredTime();

        jedis.del(preOtpId);

        String otp = otpService.generateOTP(6);
        String otpId = otpService.cacheOtp(otp, newExpiredTime);

        mailService.sendMail(
                OtpMail
                        .builder()
                        .subject("Xác minh tài khoản TooMeet")
                        .message("Mã xác thực của bạn là: " + otp)
                        .build()
                , profile.getEmail());

        return ResendOtpResponseDto
                .builder()
                .email(profile.getEmail())
                .expireIn(newExpiredTime)
                .otpId(otpId)
                .profileId(profileId)
                .build();
    }


    public Object login(UserLoginDto dto) {
        // check email and password
        User user = userRepository
                .findByEmail(dto.getEmail())
                .orElseThrow(() -> new NotFoundException("Email " + dto.getEmail() + " không tồn tại"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ForbiddenException("Sai mật khẩu");
        }

        UserResponseDto userResponse = mapper.map(user, UserResponseDto.class);

        if (!user.is2FA()) {
            String token = jwtService.generateToken(user);
            return UserAuthenticatedResponseDto
                    .builder()
                    .user(userResponse)
                    .token(token)
                    .expireIn(jwtService.getTokenExpiredTime())
                    .build();
        }

        // 2fa otp handler

        String otp = otpService.generateOTP();
        Long otpExpiredTime = otpService.getExpiredTime();
        long profileExpiredTime = otpExpiredTime * 5;

        String otpId = otpService.cacheOtp(otp, otpExpiredTime);

        String userResponseJson = gson.toJson(userResponse);
        String profileId = NanoIdUtils.randomNanoId();

        jedis.set(profileId, userResponseJson);
        jedis.pexpire(profileId, profileExpiredTime);

        otpService.sendOtp(user.getEmail(), OtpMail
                .builder()
                .subject("Xác minh 2 bước tài khoản TooMeet")
                .message("Mã xác thực của bạn là: " + otp)
                .build());

        return AuthenticationResponseDto.builder()
                .profileId(profileId)
                .otpId(otpId)
                .expiredIn(otpExpiredTime)
                .build();
    }


    public UserAuthenticatedResponseDto verifyOtpAndCreateUser(String otpId, String profileId, VerifyOtpRequestDto dto) {
        verifyOtp(otpId, dto);
        if (profileId == null) {
            throw new BadRequestException("Không tìm thấy thông tin xác thực cho yêu cầu này.");
        }

        String profileJson = jedis.get(profileId);
        UserRegisterDto userProfile = gson.fromJson(profileJson, UserRegisterDto.class);
        jedis.del(profileId);


        User newUser = createUser(userProfile);
        String token = jwtService.generateToken(newUser);

        UserResponseDto userResponse = mapper.map(newUser, UserResponseDto.class);

        return UserAuthenticatedResponseDto
                .builder()
                .user(userResponse)
                .token(token)
                .expireIn(jwtService.getTokenExpiredTime())
                .build();
    }

    public UserAuthenticatedResponseDto verifyOtpAndLogin(String otpId, String profileId, VerifyOtpRequestDto dto) {
        verifyOtp(otpId, dto);
        String profileJson = jedis.get(profileId);
        UserResponseDto userProfile = gson.fromJson(profileJson, UserResponseDto.class);
        jedis.del(profileId);

        String token = jwtService.generateToken(mapper.map(userProfile, User.class));
        return UserAuthenticatedResponseDto
                .builder()
                .user(userProfile)
                .token(token)
                .expireIn(jwtService.getTokenExpiredTime())
                .build();
    }


    private void verifyOtp(String otpId, VerifyOtpRequestDto dto) {
        if (!otpService.validateOTP(otpId, dto.getOtp())) {
            throw new ForbiddenException("OPT không hợp lệ hoặc đã hết hạn. vui lòng đăng nhập và thử lại sau.");
        }
        jedis.del(otpId);
    }

    private User createUser(UserRegisterDto dto) {
        List<UserRole.Role> roles = List.of(
                UserRole.Role.NORMAL_USER
        );


        User user = User.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())
                .build();


        user.setRoles(
                roles
                        .stream()
                        .map(role -> UserRole.builder().role(role).user(user).build())
                        .toList()
        );


        Profile userProfile = Profile.builder()
                .dateOfBirth(dto.getDateOfBirth())
                .gender(dto.getGender())
                .user(user)
                .build();

        user.setProfile(userProfile);


        return userRepository.save(user);
    }


}
