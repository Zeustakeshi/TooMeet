package com.toomeet.user.auth.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserLoginDto {
    @Email(message = "Email không hợp lệ")
    private String email;
    private String password;
}
