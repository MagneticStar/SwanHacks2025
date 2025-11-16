package com.SwanHack2025.Default.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.SwanHack2025.Default.Helpers.UserHelper;
import com.SwanHack2025.Default.Auth.LoginResponse;
import com.SwanHack2025.Default.Auth.JwtUtil;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // CREATE - Add's a new user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            // Check if username already exists
            if (userRepo.existsByUsername(user.getUsername())) {
                return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            }

            // Set default ELO
            user.setElo(500);

            // Save the new user
            User newUser = userRepo.save(user);

            // Generate JWT token
            String token = jwtUtil.generateToken(newUser.getId());

            // Return LoginResponse
            LoginResponse response = new LoginResponse(
                    token,
                    newUser.getId(),
                    newUser.getUsername(),
                    newUser.getEmail(),
                    newUser.getElo()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // READ - Get current user info
    @GetMapping
    public ResponseEntity<User> getUserById(@RequestHeader("Authorization") String authHeader) {
        User user = UserHelper.getCurrentUser(authHeader);
        Long id = user.getId();
        Optional<User> userData = userRepo.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // READ - Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        Optional<User> userData = userRepo.findByUsername(username);
        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Read - Get user by username and password
    @GetMapping("/username/{username}/password/{password}")
    public ResponseEntity<User> getUserByUsernameAndPassword(@PathVariable("username") String username,@PathVariable("password") String password){
        Optional<User> userData = userRepo.findByUsername(username);
        if (userData.isPresent()) {
            if(userData.get().getPassword().equals(password)) {
                return new ResponseEntity<>(userData.get(), HttpStatus.OK);
            } else {
                System.out.println("Wrong password!!!");
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ - Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        Optional<User> userData = userRepo.findByUsername(email);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // UPDATE - Update user by ID
    @PutMapping
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String authHeader, @RequestBody User user) {
        User reqUser = UserHelper.getCurrentUser(authHeader);
        Long id = reqUser.getId();
        Optional<User> userData = userRepo.findById(id);

        if (userData.isPresent()) {
            User existingUser = userData.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(user.getPassword());
            existingUser.setElo(user.getElo());

            return new ResponseEntity<>(userRepo.save(existingUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Delete current users account
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteUser(@RequestHeader("Authorization") String authHeader) {
        User reqUser = UserHelper.getCurrentUser(authHeader);
        Long id = reqUser.getId();
        try {
            userRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
