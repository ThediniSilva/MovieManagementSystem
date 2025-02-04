//package com.example.MovieTicketBookingSystem.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.MovieTicketBookingSystem.entity.Booking;
//import com.example.MovieTicketBookingSystem.entity.BookingRequest;
//import com.example.MovieTicketBookingSystem.services.BookingService;
//
////BookingController.java
//@RestController
//@RequestMapping("/api/bookings")
//public class BookingController {
// @Autowired
// private BookingService bookingService;
//
// @PostMapping("/book")
// public ResponseEntity<Booking> bookSeats(@RequestBody BookingRequest request) {
//     Booking booking = bookingService.bookSeats(request.getUserId(), request.getShowtimeId(), request.getSeatNumbers());
//     return ResponseEntity.ok(booking);
// }
//}
//
//
