package com.example.MovieTicketBookingSystem.repository;

import com.example.MovieTicketBookingSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // For checking existing users
}
