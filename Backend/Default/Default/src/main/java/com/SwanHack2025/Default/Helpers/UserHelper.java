package com.SwanHack2025.Default.Helpers;

import com.SwanHack2025.Default.Auth.JwtUtil;
import com.SwanHack2025.Default.Users.User;
import com.SwanHack2025.Default.Users.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserHelper {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    // Static reference to the component
    private static UserHelper instance;

    public UserHelper(JwtUtil jwtUtil, UserRepository userRepo) {
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;

        // Set the static instance
        instance = this;
    }

    // Static method to get current user
    public static User getCurrentUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.replace("Bearer ", "");
        Long userId = instance.jwtUtil.validateAndGetUserId(token);

        Optional<User> userOpt = instance.userRepo.findById(userId);
        return userOpt.orElseThrow(() -> new RuntimeException("User not found"));
    }
}
