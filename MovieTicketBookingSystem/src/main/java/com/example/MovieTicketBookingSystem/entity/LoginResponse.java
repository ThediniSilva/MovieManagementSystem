package com.example.MovieTicketBookingSystem.entity;

public class LoginResponse {
    private String token;
    private boolean isAdmin;

    public LoginResponse(String token, boolean isAdmin) {
        this.token = token;
        this.isAdmin = isAdmin;
    }

    public String getToken() {
        return token;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
