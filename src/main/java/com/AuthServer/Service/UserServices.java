package com.AuthServer.Service;

import com.AuthServer.DTOs.LoginDTO;
import com.AuthServer.DTOs.SignupDTO;
import com.AuthServer.Model.User;
import com.AuthServer.Repository.UserRepository;
import com.AuthServer.Security.JWTUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@Service
public class UserServices {

    private final UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> signup(SignupDTO signupDTO) {
        try{
            if(userRepository.existsByEmail(signupDTO.getEmail())){
                return new ResponseEntity<>("User already found", HttpStatus.NOT_FOUND);
            }
            User user = new User();
            user.setEmail(signupDTO.getEmail());
            user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));
            user.setRole(signupDTO.getRole());
            userRepository.save(user);
            return new ResponseEntity<>("User Created ",HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<?> login(LoginDTO loginDTO) {
        try {
            User user = userRepository.findByEmail(loginDTO.getEmail());
            if(user == null){
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
               return new ResponseEntity<>("Invalid Credential",HttpStatus.BAD_REQUEST);
            }
            Map<String,String> response = new HashMap<>();
            response.put("access-token", jwtUtils.generateToken(user.getEmail(),user.getRole()));
            response.put("refresh-token", jwtUtils.generateRefreshToken(user.getEmail(),user.getRole()));
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch (Exception e){
            log.error("Error while login: {}",e.getMessage());
            return new ResponseEntity<>("Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
