package com.SwanHack2025.Default.Images;

public class ImageGuessRequest {
    private Long imageId;
    private boolean guessedAI;

    // Getters & setters
    public Long getImageId() { return imageId; }
    public void setImageId(Long imageId) { this.imageId = imageId; }

    public boolean isGuessedAI() { return guessedAI; }
    public void setGuessedAI(boolean guessedAI) { this.guessedAI = guessedAI; }
}
