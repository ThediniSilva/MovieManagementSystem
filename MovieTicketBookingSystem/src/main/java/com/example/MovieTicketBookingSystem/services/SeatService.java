package com.example.MovieTicketBookingSystem.services;

import com.example.MovieTicketBookingSystem.entity.Booking;
import com.example.MovieTicketBookingSystem.entity.Seat;
import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.entity.User;
import com.example.MovieTicketBookingSystem.repository.BookingRepository;
import com.example.MovieTicketBookingSystem.repository.SeatRepository;
import com.example.MovieTicketBookingSystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    // Initialize seats for a given showtime
    public void initializeSeats(Showtime showtime, int rowCount, int seatsPerRow) {
        List<Seat> seats = new ArrayList<>();
        for (char row = 'A'; row < 'A' + rowCount; row++) {
            for (int seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
                String seatId = row + String.valueOf(seatNumber);
                Seat seat = new Seat(seatId, showtime, false);
                seats.add(seat);
            }
        }
        seatRepository.saveAll(seats);
    }

    // Get available seats for a showtime
    public List<Seat> getAvailableSeats(Long showtimeId) {
        return seatRepository.findByShowtimeId(showtimeId)
                .stream()
                .filter(seat -> !seat.isReserved())
                .toList();
    }

    // Reserve seats
    @Transactional
    public boolean reserveSeats(List<String> seatNumbers, Long showtimeId) {
        List<Seat> seats = seatRepository.findByShowtimeId(showtimeId);
        boolean allAvailable = seats.stream()
                .filter(seat -> seatNumbers.contains(seat.getSeatNumber()))
                .allMatch(seat -> !seat.isReserved());

        if (!allAvailable) {
            return false; // Some seats are already reserved
        }

        seats.forEach(seat -> {
            if (seatNumbers.contains(seat.getSeatNumber())) {
                seat.setReserved(true);
            }
        });

        seatRepository.saveAll(seats);
        return true;
    }
    
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    private final double ticketPrice = 5.0;

    // Method to book selected seats
    public Booking bookSeats(Long userId, List<Long> seatIds) {
        // Fetch user
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch selected seats
        List<Seat> seats = seatRepository.findAllById(seatIds);

        // Check if all the selected seats are available
        if (seats.stream().anyMatch(seat -> seat.isReserved())) {
            throw new RuntimeException("One or more seats are already booked.");
        }

        // Mark seats as reserved
        seats.forEach(seat -> seat.setReserved(true));
        seatRepository.saveAll(seats);

        // Calculate total price
        double totalPrice = seats.size() * ticketPrice;

        // Create and save booking
        Booking booking = new Booking(user, seats, totalPrice);
        bookingRepository.save(booking);

        return booking;
    }
    
}
