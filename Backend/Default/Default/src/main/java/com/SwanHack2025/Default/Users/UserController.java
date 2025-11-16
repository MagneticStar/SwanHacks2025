package com.SwanHack2025.Default.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.SwanHack2025.Default.Helpers.UserHelper;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    // CREATE - Add's a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            if(userRepo.existsByUsername(user.getUsername())) {
                System.out.println("Username already exists!!!");
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            user.setElo(500);
            User newUser = userRepo.save(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
