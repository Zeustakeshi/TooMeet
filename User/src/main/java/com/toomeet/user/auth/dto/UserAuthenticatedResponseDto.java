package com.toomeet.user.auth.dto;

import com.toomeet.user.user.dto.UserResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAuthenticatedResponseDto {
    private UserResponseDto user;
    private String token;
    private Long expireIn;
    @Builder.Default
    private String tokenType = "Bearer";
}
