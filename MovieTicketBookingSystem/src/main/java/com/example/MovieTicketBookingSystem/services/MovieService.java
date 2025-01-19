package com.example.MovieTicketBookingSystem.services;

import com.example.MovieTicketBookingSystem.entity.Movie;
import com.example.MovieTicketBookingSystem.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie); // Save movie to the database
    }
}