package com.example.MovieTicketBookingSystem.entity;

import java.util.List;

public class BookingRequest {

    private Long userId;
    private List<Long> seatIds;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Long> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Long> seatIds) {
        this.seatIds = seatIds;
    }
}
