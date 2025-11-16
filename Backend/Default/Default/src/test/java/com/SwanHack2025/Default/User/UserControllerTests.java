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

    // READ Tests
    @Test
    void testGetAllUsers_Success() {
        List<User> users = Arrays.asList(testUser, new User("user2", "pass2", "user2@example.com"));
        when(userRepo.findAll()).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(userRepo, times(1)).findAll();
    }

    @Test
    void testGetAllUsers_NoContent() {
        when(userRepo.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testGetUserById_Success() {
        when(userRepo.findById(1L)).thenReturn(Optional.of(testUser));

        ResponseEntity<User> response = userController.getUserById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testuser", response.getBody().getUsername());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userRepo.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
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

    // UPDATE Tests
    @Test
    void testUpdateUser_Success() {
        User updatedUser = new User("updateduser", "newpassword", "updated@example.com");
        updatedUser.setElo(750);

        when(userRepo.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepo.save(any(User.class))).thenReturn(updatedUser);

        ResponseEntity<User> response = userController.updateUser(1L, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(userRepo, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUser_NotFound() {
        User updatedUser = new User("updateduser", "newpassword", "updated@example.com");
        when(userRepo.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.updateUser(1L, updatedUser);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userRepo, never()).save(any(User.class));
    }

    // DELETE Tests
    @Test
    void testDeleteUser_Success() {
        doNothing().when(userRepo).deleteById(1L);

        ResponseEntity<HttpStatus> response = userController.deleteUser(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userRepo, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteUser_InternalServerError() {
        doThrow(new RuntimeException("Database error")).when(userRepo).deleteById(1L);

        ResponseEntity<HttpStatus> response = userController.deleteUser(1L);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testDeleteAllUsers_Success() {
        doNothing().when(userRepo).deleteAll();

        ResponseEntity<HttpStatus> response = userController.deleteAllUsers();

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userRepo, times(1)).deleteAll();
    }

    @Test
    void testDeleteAllUsers_InternalServerError() {
        doThrow(new RuntimeException("Database error")).when(userRepo).deleteAll();

        ResponseEntity<HttpStatus> response = userController.deleteAllUsers();

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}