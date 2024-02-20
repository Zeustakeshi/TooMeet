package com.toomeet.user.user;

import com.toomeet.user.image.Image;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Profile {


    @OneToOne
    User user;
    @Id
    @GeneratedValue
    private Long id;
    private Date dateOfBirth;
    private String description;
    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL)
    private Image background;
    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL)
    private Image avatar;
    private Gender gender;

}
