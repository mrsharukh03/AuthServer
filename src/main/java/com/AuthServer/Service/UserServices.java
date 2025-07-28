package com.AuthServer.Service;

import com.AuthServer.DTOs.LoginDTO;
import com.AuthServer.DTOs.SignupDTO;
import com.AuthServer.Model.User;
import com.AuthServer.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServices {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServices(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
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
    public ResponseEntity<?> login(LoginDTO loginDTO, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )
            );

            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Create session and set context
            HttpSession session = request.getSession(true); // creates session if not exists
            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext()
            );

            return ResponseEntity.ok("Login successful");
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
