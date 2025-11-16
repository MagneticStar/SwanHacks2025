package com.SwanHack2025.Default.Users;

public class UserDTO {

    private String username;
    private String password;
    private String proposedUsername;
    private String proposedPassword;
    private String proposedEmail;

    public UserDTO(String username, String password, String proposedUsername, String proposedPassword, String proposedEmail) {
        this.username = username;
        this.password = password;
        this.proposedUsername = proposedUsername;
        this.proposedPassword = proposedPassword;
        this.proposedEmail = proposedEmail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProposedUsername() {
        return proposedUsername;
    }

    public void setProposedUsername(String proposedUsername) {
        this.proposedUsername = proposedUsername;
    }

    public String getProposedPassword() {
        return proposedPassword;
    }

    public void setProposedPassword(String proposedPassword) {
        this.proposedPassword = proposedPassword;
    }

    public String getProposedEmail() {
        return proposedEmail;
    }

    public void setProposedEmail(String proposedEmail) {
        this.proposedEmail = proposedEmail;
    }
}
