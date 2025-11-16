package com.SwanHack2025.Default.User;

import com.SwanHack2025.Default.Users.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTests {

    @Test
    void testUserCreationWithNoArgConstructor() {
        User user = new User();
        assertNotNull(user);
        assertNull(user.getId());
        assertNull(user.getUsername());
        assertNull(user.getPassword());
        assertNull(user.getEmail());
        assertNull(user.getElo());
    }

    @Test
    void testUserCreationWithParameterizedConstructor() {
        User user = new User("testuser", "password123", "test@example.com");

        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
        assertEquals("password123", user.getPassword());
        assertEquals("test@example.com", user.getEmail());
        assertEquals(500, user.getElo());
    }

    @Test
    void testDefaultEloIs500() {
        User user = new User("testuser", "password123", "test@example.com");
        assertEquals(500, user.getElo());
    }

    @Test
    void testSettersAndGetters() {
        User user = new User();

        user.setId(1L);
        user.setUsername("john_doe");
        user.setPassword("securepass");
        user.setEmail("john@example.com");
        user.setElo(750);

        assertEquals(1L, user.getId());
        assertEquals("john_doe", user.getUsername());
        assertEquals("securepass", user.getPassword());
        assertEquals("john@example.com", user.getEmail());
        assertEquals(750, user.getElo());
    }

    @Test
    void testEloCanBeUpdated() {
        User user = new User("testuser", "password123", "test@example.com");
        assertEquals(500, user.getElo());

        user.setElo(1000);
        assertEquals(1000, user.getElo());
    }

    @Test
    void testPasswordCanBeChanged() {
        User user = new User("testuser", "oldpassword", "test@example.com");
        assertEquals("oldpassword", user.getPassword());

        user.setPassword("newpassword");
        assertEquals("newpassword", user.getPassword());
    }

    @Test
    void testEmailCanBeChanged() {
        User user = new User("testuser", "password123", "old@example.com");
        assertEquals("old@example.com", user.getEmail());

        user.setEmail("new@example.com");
        assertEquals("new@example.com", user.getEmail());
    }
}