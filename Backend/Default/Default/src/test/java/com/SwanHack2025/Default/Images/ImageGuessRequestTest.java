package com.SwanHack2025.Default.Images;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ImageGuessRequestTest {

    private ImageGuessRequest request;

    @BeforeEach
    void setUp() {
        request = new ImageGuessRequest();
    }

    @Test
    void testDefaultConstructor() {
        ImageGuessRequest req = new ImageGuessRequest();
        assertNotNull(req);
        assertNull(req.getImageId());
        assertFalse(req.isGuessedAI());
    }

    @Test
    void testSetImageId() {
        request.setImageId(1L);
        assertEquals(1L, request.getImageId());
    }

    @Test
    void testSetGuessedAI_True() {
        request.setGuessedAI(true);
        assertTrue(request.isGuessedAI());
    }

    @Test
    void testSetGuessedAI_False() {
        request.setGuessedAI(false);
        assertFalse(request.isGuessedAI());
    }

    @Test
    void testImageIdCanBeNull() {
        request.setImageId(null);
        assertNull(request.getImageId());
    }

    @Test
    void testImageIdCanBeZero() {
        request.setImageId(0L);
        assertEquals(0L, request.getImageId());
    }

    @Test
    void testImageIdCanBeNegative() {
        request.setImageId(-1L);
        assertEquals(-1L, request.getImageId());
    }

    @Test
    void testImageIdCanBeLarge() {
        Long largeId = Long.MAX_VALUE;
        request.setImageId(largeId);
        assertEquals(largeId, request.getImageId());
    }

    @Test
    void testCompleteRequest_AIGuess() {
        request.setImageId(5L);
        request.setGuessedAI(true);

        assertEquals(5L, request.getImageId());
        assertTrue(request.isGuessedAI());
    }

    @Test
    void testCompleteRequest_HumanGuess() {
        request.setImageId(10L);
        request.setGuessedAI(false);

        assertEquals(10L, request.getImageId());
        assertFalse(request.isGuessedAI());
    }

    @Test
    void testGuessedAIDefaultValue() {
        // Default primitive boolean should be false
        assertFalse(request.isGuessedAI());
    }

    @Test
    void testSettersReturnVoid() {
        // Just verify setters work without exceptions
        assertDoesNotThrow(() -> {
            request.setImageId(1L);
            request.setGuessedAI(true);
        });
    }

    @Test
    void testMultipleUpdates() {
        request.setImageId(1L);
        request.setGuessedAI(true);

        request.setImageId(2L);
        assertEquals(2L, request.getImageId());
        assertTrue(request.isGuessedAI());

        request.setGuessedAI(false);
        assertEquals(2L, request.getImageId());
        assertFalse(request.isGuessedAI());
    }
}