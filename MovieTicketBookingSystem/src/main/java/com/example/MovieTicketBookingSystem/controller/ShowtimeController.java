package com.example.MovieTicketBookingSystem.controller;

import com.example.MovieTicketBookingSystem.entity.Showtime;
import com.example.MovieTicketBookingSystem.entity.Movie;
import com.example.MovieTicketBookingSystem.entity.Theater;
import com.example.MovieTicketBookingSystem.repository.ShowtimeRepository;
import com.example.MovieTicketBookingSystem.repository.MovieRepository;
import com.example.MovieTicketBookingSystem.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:4200")
public class ShowtimeController {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TheaterRepository theaterRepository;

    // ✅ Add a new showtime using @RequestBody
    @PostMapping("/add")
    public ResponseEntity<String> addShowtime(@RequestBody Showtime showtime) {
        Optional<Movie> movie = movieRepository.findById(showtime.getMovie().getId());
        Optional<Theater> theater = theaterRepository.findById(showtime.getTheater().getId());

        if (movie.isEmpty() || theater.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid movie or theater ID.");
        }

        showtime.setMovie(movie.get());
        showtime.setTheater(theater.get());
        showtimeRepository.save(showtime);

        return ResponseEntity.ok("Showtime added successfully!");
    }

    // ✅ Get all showtimes for a specific movie
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Showtime>> getShowtimesByMovie(@PathVariable Long movieId) {
        List<Showtime> showtimes = showtimeRepository.findByMovieId(movieId);
        if (showtimes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(showtimes);
    }

    // ✅ Get all showtimes
    @GetMapping("/all")
    public ResponseEntity<List<Showtime>> getAllShowtimes() {
        List<Showtime> showtimes = showtimeRepository.findAll();
        return ResponseEntity.ok(showtimes);
    }

    // ✅ Update a showtime using @RequestBody
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateShowtime(@PathVariable Long id, @RequestBody Showtime updatedShowtime) {
        Optional<Showtime> existingShowtime = showtimeRepository.findById(id);

        if (existingShowtime.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Showtime showtime = existingShowtime.get();
        showtime.setStartDate(updatedShowtime.getStartDate());
        showtime.setStartTime(updatedShowtime.getStartTime());
        showtime.setTicketPrice(updatedShowtime.getTicketPrice());

        showtimeRepository.save(showtime);
        return ResponseEntity.ok("Showtime updated successfully!");
    }

    // ✅ Delete a showtime by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteShowtime(@PathVariable Long id) {
        if (!showtimeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        showtimeRepository.deleteById(id);
        return ResponseEntity.ok("Showtime deleted successfully!");
    }
}
