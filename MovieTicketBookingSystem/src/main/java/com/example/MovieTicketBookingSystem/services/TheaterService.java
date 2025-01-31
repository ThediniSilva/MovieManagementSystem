package com.example.MovieTicketBookingSystem.services;

import com.example.MovieTicketBookingSystem.entity.Theater;
import com.example.MovieTicketBookingSystem.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheaterService {

    @Autowired
    private TheaterRepository theaterRepository;

    public List<Theater> getAllTheaters() {
        return theaterRepository.findAll();
    }

    public Optional<Theater> getTheaterById(Long id) {
        return theaterRepository.findById(id);
    }

    public Theater createTheater(Theater theater) {
        return theaterRepository.save(theater);
    }

    public Theater updateTheater(Long id, Theater theaterDetails) {
        Optional<Theater> theater = theaterRepository.findById(id);
        if (theater.isPresent()) {
            Theater t = theater.get();
            t.setName(theaterDetails.getName());
            t.setLocation(theaterDetails.getLocation());
            t.setSeatCount(theaterDetails.getSeatCount());
            t.setFeatures(theaterDetails.getFeatures());
            t.setImageUrl(theaterDetails.getImageUrl());
            return theaterRepository.save(t);
        }
        return null;
    }

    public boolean deleteTheater(Long id) {
        if (theaterRepository.existsById(id)) {
            theaterRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
