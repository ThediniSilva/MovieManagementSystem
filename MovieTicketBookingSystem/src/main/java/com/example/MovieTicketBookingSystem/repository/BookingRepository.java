package com.example.MovieTicketBookingSystem.repository;

import com.example.MovieTicketBookingSystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
