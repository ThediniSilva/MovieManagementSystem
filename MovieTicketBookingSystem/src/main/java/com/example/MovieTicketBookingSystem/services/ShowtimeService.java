package com.example.MovieTicketBookingSystem.services;

import org.springframework.stereotype.Service;

import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.repository.ShowtimeRepository;


@Service
public class ShowtimeService {
    
    private final ShowtimeRepository showtimeRepository;

    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    public Showtime getShowtimeById(Long showtimeId) {
        return showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found with id: " + showtimeId));
    }
}
