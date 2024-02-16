package com.toomeet.user.image.dto;

import com.toomeet.user.image.Format;
import lombok.Data;

import java.util.Date;

@Data
public class ImageResponseDto {
    private Long id;
    private String url;
    private String cloudPublicId;
    private Format format;
    private Date createdAt;
    private Date updatedAt;
}
