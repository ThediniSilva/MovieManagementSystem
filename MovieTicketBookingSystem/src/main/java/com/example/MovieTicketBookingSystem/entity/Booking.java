package com.example.MovieTicketBookingSystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(
      name = "booking_seat", 
      joinColumns = @JoinColumn(name = "booking_id"), 
      inverseJoinColumns = @JoinColumn(name = "seat_id")
    )
    private List<Seat> seats;

    private double totalPrice;

    // Constructors, getters, and setters
    public Booking() {}

    public Booking(User user, List<Seat> seats, double totalPrice) {
        this.user = user;
        this.seats = seats;
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
