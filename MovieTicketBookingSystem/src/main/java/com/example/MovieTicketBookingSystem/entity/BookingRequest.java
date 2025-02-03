package com.example.MovieTicketBookingSystem.entity;



import java.util.List;

public class BookingRequest {

    private Long userId;
    private Long showtimeId;
    private List<String> seatNumbers;

    // Default constructor
    public BookingRequest() {}

    // Full constructor
    public BookingRequest(Long userId, Long showtimeId, List<String> seatNumbers) {
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.seatNumbers = seatNumbers;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public List<String> getSeatNumbers() {
        return seatNumbers;
    }

    public void setSeatNumbers(List<String> seatNumbers) {
        this.seatNumbers = seatNumbers;
    }
}
