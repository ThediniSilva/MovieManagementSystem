package com.example.MovieTicketBookingSystem.repository;

import com.example.MovieTicketBookingSystem.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowtimeId(Long showtimeId);
    
    // This should work correctly with a list of ids
    List<Seat> findAllByIdIn(List<Long> ids);
}
