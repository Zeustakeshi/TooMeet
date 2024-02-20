package com.toomeet.user.jwt;

import com.toomeet.user.user.User;

public interface JwtService {
    String generateToken(User user);
    
    Long getTokenExpiredTime();

}
