package com.example.MovieTicketBookingSystem.repository;



import com.example.MovieTicketBookingSystem.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // JpaRepository provides basic CRUD methods
}
