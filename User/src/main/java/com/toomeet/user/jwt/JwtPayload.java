package com.toomeet.user.jwt;


import com.toomeet.user.image.dto.ImageResponseDto;
import com.toomeet.user.user.dto.UserRoleResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtPayload {
    private String name;
    private Long id;
    private String email;
    private ImageResponseDto avatar;
    private List<UserRoleResponseDto> roles;
    private Date createdAt;
}
