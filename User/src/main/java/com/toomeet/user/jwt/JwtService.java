package com.toomeet.user.jwt;

import com.toomeet.user.user.User;

public interface JwtService {
    String generateToken(User user);

    Long extractUserId(String token);

    JwtPayload extractPayload(String token);

    boolean isValidToken(String token, User user);

    Long getTokenExpiredTime();

}
