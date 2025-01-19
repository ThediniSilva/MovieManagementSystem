package com.example.MovieTicketBookingSystem.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import com.example.MovieTicketBookingSystem.entity.Movie;
import com.example.MovieTicketBookingSystem.repository.MovieRepository;

import java.io.IOException;
import java.nio.file.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieRepository movieRepository;

    @Value("${movie.image.directory}")
    private String imageDirectory;

    // Add a movie
    @PostMapping("/add")
    public ResponseEntity<String> addMovie(
            @RequestParam("title") String title,
            @RequestParam("genre") String genre,
            @RequestParam("duration") int duration,
            @RequestParam("director") String director,
            @RequestParam("image") MultipartFile image) {
        if (title.isEmpty() || genre.isEmpty() || director.isEmpty() || duration <= 0 || image.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input data.");
        }

        try {
            Path imagePath = Paths.get(imageDirectory);
            Files.createDirectories(imagePath);

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = imagePath.resolve(fileName);
            Files.write(filePath, image.getBytes());

            Movie movie = new Movie(title, genre, duration, director, fileName); // Store only the file name
            movieRepository.save(movie);

            logger.info("Movie added successfully: {}", movie);
            return ResponseEntity.status(HttpStatus.CREATED).body("Movie added successfully!");
        } catch (IOException e) {
            logger.error("Error saving movie: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving movie.");
        }
    }

    // Update a movie
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateMovie(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("genre") String genre,
            @RequestParam("duration") int duration,
            @RequestParam("director") String director,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            // Check if the movie exists
            Movie movie = movieRepository.findById(id).orElse(null);
            if (movie == null) {
                logger.warn("Movie not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
            }

            // Update movie details
            movie.setTitle(title);
            movie.setGenre(genre);
            movie.setDuration(duration);
            movie.setDirector(director);

            // Handle image upload
            if (image != null && !image.isEmpty()) {
                try {
                    // Delete the old image if it exists
                    if (movie.getImageUrl() != null) {
                        Path oldImagePath = Paths.get(imageDirectory).resolve(movie.getImageUrl());
                        Files.deleteIfExists(oldImagePath);
                    }

                    // Save the new image
                    Path imagePath = Paths.get(imageDirectory);
                    Files.createDirectories(imagePath);

                    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                    Path filePath = imagePath.resolve(fileName);
                    Files.write(filePath, image.getBytes());

                    movie.setImageUrl(fileName);
                } catch (IOException e) {
                    logger.error("Error saving updated image: ", e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error saving the new image.");
                }
            }

            // Save updated movie
            movieRepository.save(movie);
            logger.info("Movie updated successfully with ID: {}", id);
            return ResponseEntity.ok("Movie updated successfully!");
        } catch (Exception e) {
            logger.error("Unexpected error while updating movie with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while updating the movie.");
        }
    }

    // Delete a movie
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
        }

        try {
            // Delete associated image if it exists
            if (movie.getImageUrl() != null) {
                Files.deleteIfExists(Paths.get(imageDirectory).resolve(movie.getImageUrl()));
            }

            // Delete movie from the repository
            movieRepository.delete(movie);

            // Return 204 No Content to signify success
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // Log the error and return 500 Internal Server Error
            logger.error("Error deleting movie: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting movie.");
        }
    }


    // Fetch all movies
    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        return ResponseEntity.ok(movies);
    }

    // Serve movie images
    @GetMapping(value = "/image/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(imageDirectory).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            logger.error("Error fetching image: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 // Fetch a single movie by ID
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(movie);
    }

}
