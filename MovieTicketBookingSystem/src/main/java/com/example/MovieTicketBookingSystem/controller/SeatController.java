package com.example.MovieTicketBookingSystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.MovieTicketBookingSystem.entity.Booking;
import com.example.MovieTicketBookingSystem.entity.BookingRequest;
import com.example.MovieTicketBookingSystem.entity.Seat;
import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.repository.ShowtimeRepository;
import com.example.MovieTicketBookingSystem.services.SeatService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final ShowtimeRepository showtimeRepository;
    private final SeatService seatService;

    public SeatController(ShowtimeRepository showtimeRepository, SeatService seatService) {
        this.showtimeRepository = showtimeRepository;
        this.seatService = seatService;
    }

    // Get available seats for a showtime
    @GetMapping("/{showtimeId}/available")
    public List<Seat> getAvailableSeats(@PathVariable Long showtimeId) {
        return seatService.getAvailableSeats(showtimeId);
    }

    // Initialize seats for a showtime
    @PostMapping("/{showtimeId}/initialize")
    public String initializeSeats(@PathVariable Long showtimeId, @RequestParam int rowCount, @RequestParam int seatsPerRow) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        seatService.initializeSeats(showtime, rowCount, seatsPerRow);
        return "Seats initialized successfully!";
    }

 // Book selected seats
    @PostMapping("/book")
    public Booking bookSeats(@RequestBody BookingRequest bookingRequest) {
        return seatService.bookSeats(bookingRequest.getUserId(), bookingRequest.getSeatIds());
    }
}
