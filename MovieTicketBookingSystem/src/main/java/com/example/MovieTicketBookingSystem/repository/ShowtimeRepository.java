package com.example.MovieTicketBookingSystem.repository;

import com.example.MovieTicketBookingSystem.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

    // Existing method to get showtimes by movie ID
    List<Showtime> findByMovieId(Long movieId);

   
}
