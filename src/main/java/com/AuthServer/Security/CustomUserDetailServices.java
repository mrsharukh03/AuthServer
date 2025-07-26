package com.AuthServer.Security;

import com.AuthServer.Model.User;
import com.AuthServer.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailServices implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user != null) {
            return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
        }
        throw new UsernameNotFoundException("User Not found ");
    }

}
