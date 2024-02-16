package com.toomeet.user.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("info")
    public ResponseEntity<String> getUserInfo(Principal principal) {
        String username = principal.getName();
        return new ResponseEntity<>(username, HttpStatus.OK);
    }

}
