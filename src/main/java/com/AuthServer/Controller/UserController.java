package com.AuthServer.Controller;

import com.AuthServer.DTOs.LoginDTO;
import com.AuthServer.DTOs.SignupDTO;
import com.AuthServer.Service.UserServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/")
public class UserController {

    private final UserServices userServices;

    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/test")
    public String welcome(){
        return "Hello and Welcome";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO signupDTO){
            return userServices.signup(signupDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO, HttpServletRequest request){
        return userServices.login(loginDTO,request);
    }
}
