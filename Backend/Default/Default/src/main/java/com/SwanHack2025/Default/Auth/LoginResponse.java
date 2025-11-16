package com.SwanHack2025.Default.Auth;

public class LoginResponse {
    private String token;
    private Long id;
    private String username;
    private String email;
    private Integer elo;

    public LoginResponse(String token, Long id, String username, String email, Integer elo) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.elo = elo;
    }

    // Getters
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public Integer getElo() { return elo; }
}
