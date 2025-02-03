package com.example.MovieTicketBookingSystem.services;


import com.example.MovieTicketBookingSystem.entity.Seat;
import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void reserveSeats(List<String> seatNumbers, Long showtimeId) {
        List<Seat> seats = seatRepository.findByShowtimeId(showtimeId);
        for (Seat seat : seats) {
            if (seatNumbers.contains(seat.getSeatNumber())) {
                seat.setReserved(true);
            }
        }
        seatRepository.saveAll(seats);
    }
}
