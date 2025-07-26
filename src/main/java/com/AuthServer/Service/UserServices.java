package com.AuthServer.Service;

import com.AuthServer.DTOs.LoginDTO;
import com.AuthServer.DTOs.SignupDTO;
import com.AuthServer.Model.User;
import com.AuthServer.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServices {

    private final UserRepository userRepository;
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
        return null;
    }
}
