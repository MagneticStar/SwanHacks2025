package com.SwanHack2025.Default.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query method to find user by username
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndPassword(String username, String password);

    // Custom query method to check if username exists
    boolean existsByUsername(String username);

}