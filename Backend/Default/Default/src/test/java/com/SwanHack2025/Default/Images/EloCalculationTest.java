package com.SwanHack2025.Default.Images;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EloCalculationTest {

    private static final int K = 30;

    private double calculateExpected(double ratingA, double ratingB) {
        return 1.0 / (1.0 + Math.pow(10, (ratingB - ratingA) / 400.0));
    }

    private int calculateNewRating(double currentRating, double actualScore, double expectedScore) {
        return (int) Math.round(currentRating + K * (actualScore - expectedScore));
    }

    @Test
    void testEqualRatings_UserWins() {
        double userRating = 500;
        double imageRating = 500;
        double actualScoreUser = 1.0;

        double expectedUser = calculateExpected(userRating, imageRating);
        int newUserElo = calculateNewRating(userRating, actualScoreUser, expectedUser);

        assertEquals(0.5, expectedUser, 0.01);
        assertEquals(515, newUserElo);
    }

    @Test
    void testEqualRatings_UserLoses() {
        double userRating = 500;
        double imageRating = 500;
        double actualScoreUser = 0.0;

        double expectedUser = calculateExpected(userRating, imageRating);
        int newUserElo = calculateNewRating(userRating, actualScoreUser, expectedUser);

        assertEquals(0.5, expectedUser, 0.01);
        assertEquals(485, newUserElo);
    }

    @Test
    void testHigherRatedUserWins() {
        double userRating = 800;
        double imageRating = 500;
        double actualScoreUser = 1.0;

        double expectedUser = calculateExpected(userRating, imageRating);
        int newUserElo = calculateNewRating(userRating, actualScoreUser, expectedUser);

        assertTrue(expectedUser > 0.5);
        assertTrue(newUserElo < 800 + 15); // Should gain less than K/2
    }

    @Test
    void testLowerRatedUserWins() {
        double userRating = 500;
        double imageRating = 800;
        double actualScoreUser = 1.0;

        double expectedUser = calculateExpected(userRating, imageRating);
        int newUserElo = calculateNewRating(userRating, actualScoreUser, expectedUser);

        assertTrue(expectedUser < 0.5);
        assertTrue(newUserElo > 500 + 15); // Should gain more than K/2
    }

    @Test
    void testSymmetricEloChange() {
        double userRating = 600;
        double imageRating = 550;

        double actualScoreUser = 1.0;
        double actualScoreImage = 0.0;

        double expectedUser = calculateExpected(userRating, imageRating);
        double expectedImage = calculateExpected(imageRating, userRating);

        int newUserElo = calculateNewRating(userRating, actualScoreUser, expectedUser);
        int newImageElo = calculateNewRating(imageRating, actualScoreImage, expectedImage);

        int userChange = newUserElo - (int)userRating;
        int imageChange = newImageElo - (int)imageRating;

        // Changes should be roughly opposite (within rounding error)
        assertEquals(-userChange, imageChange, 2);
    }

    @Test
    void testExpectedScoreSumsToOne() {
        double userRating = 700;
        double imageRating = 600;

        double expectedUser = calculateExpected(userRating, imageRating);
        double expectedImage = calculateExpected(imageRating, userRating);

        assertEquals(1.0, expectedUser + expectedImage, 0.0001);
    }

    @Test
    void testExtremeRatingDifference() {
        double userRating = 2000;
        double imageRating = 500;

        double expectedUser = calculateExpected(userRating, imageRating);

        assertTrue(expectedUser > 0.99);
    }

    @Test
    void testKFactorImpact() {
        double userRating = 500;
        double imageRating = 500;
        double actualScore = 1.0;
        double expected = 0.5;

        int change = (int) Math.round(K * (actualScore - expected));

        assertEquals(15, change);
    }
}