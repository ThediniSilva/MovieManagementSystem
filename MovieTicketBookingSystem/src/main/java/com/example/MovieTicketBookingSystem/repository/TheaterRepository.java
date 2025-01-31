package com.example.MovieTicketBookingSystem.repository;

import com.example.MovieTicketBookingSystem.entity.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long> {
	
}