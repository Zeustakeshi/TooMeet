package com.toomeet.user.user.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private ProfileResponseDto profile;
    private Date createdAt;
    private Date updatedAt;
}
