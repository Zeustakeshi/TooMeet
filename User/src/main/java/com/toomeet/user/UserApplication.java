package com.toomeet.user;

import com.toomeet.user.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//@EnableDiscoveryClient
public class UserApplication implements CommandLineRunner {
    @Autowired
    private JwtService jwtService;

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {

    }
}
