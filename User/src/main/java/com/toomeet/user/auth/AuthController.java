package com.toomeet.user.auth;

import com.toomeet.user.auth.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Validated
public class AuthController {
    private final AuthService authService;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponseDto> register(@RequestBody @Valid UserRegisterDto dto) {
        AuthenticationResponseDto userResponse = authService.register(dto);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    @PostMapping("otp/resend")
    public ResponseEntity<ResendOtpResponseDto> resendOtp(@RequestParam("o") String otpId, @RequestParam("p") String profileId) {
        ResendOtpResponseDto resendOtpResponse = authService.resendOtp(otpId, profileId);
        return new ResponseEntity<>(resendOtpResponse, HttpStatus.CREATED);
    }

    @PostMapping("otp/verify")
    public ResponseEntity<UserAuthenticatedResponseDto> verifyOtp(@RequestParam("o") String otpId, @RequestParam("p") String profileId, @RequestBody VerifyOtpRequestDto dto) {
        UserAuthenticatedResponseDto userAuthenticatedResponse = authService.verifyOtpAndCreateUser(otpId, profileId, dto);
        return new ResponseEntity<>(userAuthenticatedResponse, HttpStatus.OK);
    }

    @PostMapping("otp/2fa/verify")
    public ResponseEntity<UserAuthenticatedResponseDto> verify2FaOtp(@RequestParam("o") String otpId, @RequestParam("p") String profileId, @RequestBody VerifyOtpRequestDto dto) {
        UserAuthenticatedResponseDto userAuthenticatedResponse = authService.verifyOtpAndLogin(otpId, profileId, dto);
        return new ResponseEntity<>(userAuthenticatedResponse, HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody @Valid UserLoginDto dto) {
        Object response = authService.login(dto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
