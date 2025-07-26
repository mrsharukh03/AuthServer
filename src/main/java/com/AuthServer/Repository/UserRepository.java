package com.AuthServer.Repository;

import com.AuthServer.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    User findByEmail(String username);
    boolean existsByEmail(String email);
}
