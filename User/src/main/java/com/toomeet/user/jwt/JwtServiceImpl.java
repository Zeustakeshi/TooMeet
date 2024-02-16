package com.toomeet.user.jwt;

import com.google.gson.Gson;
import com.toomeet.user.image.dto.ImageResponseDto;
import com.toomeet.user.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final Gson gson;
    private final ModelMapper mapper;

    @Value("${jwt.secret_key}")
    private String secretKey;

    @Value("${jwt.expired_time}")
    private Long expiredTime;

    @Override
    public Long getTokenExpiredTime() {
        return expiredTime;
    }

    @Override
    public String generateToken(User user) {
        Date now = new Date(System.currentTimeMillis());
        Date expiredTime = new Date(System.currentTimeMillis() + this.expiredTime);


        Claims claims = Jwts.claims();
        JwtPayload payload = mapper.map(user, JwtPayload.class);

        claims.put("name", payload.getName());
        claims.put("email", payload.getEmail());
        claims.put("avatar", payload.getAvatar());
        claims.put("createdAt", payload.getCreatedAt());
        claims.put("roles", payload.getRoles());
        claims.put("id", payload.getId());


        return Jwts
                .builder()
                .setIssuedAt(now)
                .setExpiration(expiredTime)
                .setSubject(payload.getId().toString())
                .setClaims(claims)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    @Override
    public Long extractUserId(String token) {
        return Long.parseLong(extractClaims(token, Claims::getSubject));
    }

    @Override
    public JwtPayload extractPayload(String token) {
        Claims claims = extractClaims(token, claims1 -> claims1);
        return JwtPayload.builder()
                .id(claims.get("id", Long.class))
                .avatar(claims.get("avatar", ImageResponseDto.class))
                .createdAt(claims.get("createdAt", Date.class))
                .email(claims.get("email", String.class))
                .name(claims.get("name", String.class))
                .roles(claims.get("roles", List.class))
                .build();
    }

    @Override
    public boolean isValidToken(String token, User user) {
        Long userId = extractUserId(token);
        return !isTokenExpired(token) && user.getId().equals(userId);
    }


    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }

}
