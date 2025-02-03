package com.example.MovieTicketBookingSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MovieTicketBookingSystem.entity.Booking;
import com.example.MovieTicketBookingSystem.entity.Seat;
import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.entity.User;
import com.example.MovieTicketBookingSystem.repository.BookingRepository;
import com.example.MovieTicketBookingSystem.repository.SeatRepository;

import jakarta.transaction.Transactional;

//BookingService.java
@Service
public class BookingService {
 @Autowired
 private SeatRepository seatRepository;

 @Autowired
 private BookingRepository bookingRepository;

 @Transactional
 public Booking bookSeats(Long userId, Long showtimeId, List<String> seatNumbers) {
     List<Seat> seats = seatRepository.findByShowtimeId(showtimeId);
     double ticketPrice = 5.0; // Example price per seat
     double totalPrice = seatNumbers.size() * ticketPrice;

     // Check and reserve seats
     for (Seat seat : seats) {
         if (seatNumbers.contains(seat.getSeatNumber()) && seat.isReserved()) {
             throw new RuntimeException("Seat " + seat.getSeatNumber() + " is already reserved");
         }
     }

     for (Seat seat : seats) {
         if (seatNumbers.contains(seat.getSeatNumber())) {
             seat.setReserved(true);
             seatRepository.save(seat);
         }
     }

     // Save booking
     Booking booking = new Booking();
     booking.setUser(new User(userId)); // Use user id to reference user
     booking.setShowtime(new Showtime(showtimeId)); // Use showtime id
     booking.setSeatNumbers(String.join(", ", seatNumbers));
     booking.setTotalPrice(totalPrice);

     return bookingRepository.save(booking);
 }
}
