package com.toomeet.user.jwt;

import com.google.gson.Gson;
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


        return Jwts
                .builder()
                .setIssuedAt(now)
                .setExpiration(expiredTime)
                .setSubject(user.getId().toString())
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
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
