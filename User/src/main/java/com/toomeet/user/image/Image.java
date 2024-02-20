package com.toomeet.user.image;

import com.toomeet.user.user.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String url;

    private String cloudPublicId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Format format;

    @OneToOne
    private Profile profile;

    @CreationTimestamp
    private Date createAt;

    @UpdateTimestamp
    private Date updatedAt;

}
