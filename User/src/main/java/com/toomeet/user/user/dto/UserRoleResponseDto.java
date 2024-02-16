package com.toomeet.user.user.dto;

import com.toomeet.user.user.UserRole;
import lombok.Data;

import java.util.Date;

@Data
public class UserRoleResponseDto {
    private UserRole.Role role;
    private Date createdAt;
    private Date updatedAt;
}
