package com.SwanHack2025.Default.User;

import com.SwanHack2025.Default.Users.UserController;
import com.SwanHack2025.Default.Users.User;
import com.SwanHack2025.Default.Users.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private UserController userController;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User("testuser", "password123", "test@example.com");
        testUser.setId(1L);
    }

    // CREATE Tests
    @Test
    void testCreateUser_Success() {
        when(userRepo.existsByUsername("testuser")).thenReturn(false);
        when(userRepo.save(any(User.class))).thenReturn(testUser);

        ResponseEntity<User> response = userController.createUser(testUser);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
        assertEquals(500, response.getBody().getElo());
        verify(userRepo, times(1)).save(any(User.class));
    }

    @Test
    void testCreateUser_UsernameAlreadyExists() {
        when(userRepo.existsByUsername("testuser")).thenReturn(true);

        ResponseEntity<User> response = userController.createUser(testUser);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertNull(response.getBody());
        verify(userRepo, never()).save(any(User.class));
    }

    @Test
    void testCreateUser_InternalServerError() {
        when(userRepo.existsByUsername(anyString())).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<User> response = userController.createUser(testUser);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetUserByUsername_Success() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        ResponseEntity<User> response = userController.getUserByUsername("testuser");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
    }

    @Test
    void testGetUserByUsername_NotFound() {
        when(userRepo.findByUsername("nonexistent")).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserByUsername("nonexistent");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testGetUserByUsernameAndPassword_Success() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        ResponseEntity<User> response = userController.getUserByUsernameAndPassword("testuser", "password123");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
    }

    @Test
    void testGetUserByUsernameAndPassword_WrongPassword() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        ResponseEntity<User> response = userController.getUserByUsernameAndPassword("testuser", "wrongpassword");

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    void testGetUserByUsernameAndPassword_UserNotFound() {
        when(userRepo.findByUsername("nonexistent")).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserByUsernameAndPassword("nonexistent", "password123");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }



}