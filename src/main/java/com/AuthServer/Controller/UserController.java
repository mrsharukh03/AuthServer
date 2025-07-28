package com.AuthServer.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/")
public class UserController {
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public String welcome(){
        return "Hello and Welcome";
    }
}
