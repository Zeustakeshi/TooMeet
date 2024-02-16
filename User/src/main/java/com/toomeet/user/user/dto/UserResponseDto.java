package com.toomeet.user.user.dto;

import com.toomeet.user.image.dto.ImageResponseDto;
import com.toomeet.user.user.Gender;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String description;
    private ImageResponseDto background;
    private ImageResponseDto avatar;
    private List<UserRoleResponseDto> roles;
    private Date dateOfBirth;
    private Gender gender;
    private Date createdAt;
    private Date updatedAt;
}
