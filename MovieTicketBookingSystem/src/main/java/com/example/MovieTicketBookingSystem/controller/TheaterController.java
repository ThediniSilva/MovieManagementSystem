package com.example.MovieTicketBookingSystem.controller;

import com.example.MovieTicketBookingSystem.entity.Theater;
import com.example.MovieTicketBookingSystem.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/theaters")
@CrossOrigin(origins = "http://localhost:4200")
public class TheaterController {

    private static final Logger logger = LoggerFactory.getLogger(TheaterController.class);

    @Autowired
    private TheaterRepository theaterRepository;

    @Value("${theater.image.directory}")
    private String imageDirectory;

    // Add a theater
    @PostMapping("/add")
    public ResponseEntity<String> addTheater(
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("seatCount") int seatCount,
            @RequestParam("features") String features,
            @RequestParam("image") MultipartFile image) {
        if (name.isEmpty() || location.isEmpty() || seatCount <= 0 || features.isEmpty() || image.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input data.");
        }

        try {
            Path imagePath = Paths.get(imageDirectory);
            Files.createDirectories(imagePath);

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = imagePath.resolve(fileName);
            Files.write(filePath, image.getBytes());

            Theater theater = new Theater(name, location, seatCount, features, fileName); // Store only the file name
            theaterRepository.save(theater);  // Ensure this is working

            logger.info("Theater added successfully: {}", theater);  // Log to confirm

            return ResponseEntity.status(HttpStatus.CREATED).body("Theater added successfully!");
        } catch (IOException e) {
            logger.error("Error saving theater: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving theater.");
        }
    }


    // Update a theater
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTheater(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("seatCount") int seatCount,
            @RequestParam("features") String features,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            // Check if the theater exists
            Theater theater = theaterRepository.findById(id).orElse(null);
            if (theater == null) {
                logger.warn("Theater not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Theater not found!");
            }

            // Update theater details
            theater.setName(name);
            theater.setLocation(location);
            theater.setSeatCount(seatCount);
            theater.setFeatures(features);

            // Handle image upload
            if (image != null && !image.isEmpty()) {
                try {
                    // Delete the old image if it exists
                    if (theater.getImageUrl() != null) {
                        Path oldImagePath = Paths.get(imageDirectory).resolve(theater.getImageUrl());
                        Files.deleteIfExists(oldImagePath);
                    }

                    // Save the new image
                    Path imagePath = Paths.get(imageDirectory);
                    Files.createDirectories(imagePath);

                    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                    Path filePath = imagePath.resolve(fileName);
                    Files.write(filePath, image.getBytes());

                    theater.setImageUrl(fileName);
                } catch (IOException e) {
                    logger.error("Error saving updated image: ", e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error saving the new image.");
                }
            }

            // Save updated theater
            theaterRepository.save(theater);
            logger.info("Theater updated successfully with ID: {}", id);
            return ResponseEntity.ok("Theater updated successfully!");
        } catch (Exception e) {
            logger.error("Unexpected error while updating theater with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while updating the theater.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteTheater(@PathVariable Long id) {
        // Find the theater by ID
        Theater theater = theaterRepository.findById(id).orElse(null);

        // If theater is not found, return a NOT_FOUND response
        if (theater == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Theater not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        try {
            // Delete associated image if it exists
            if (theater.getImageUrl() != null) {
                Files.deleteIfExists(Paths.get(imageDirectory).resolve(theater.getImageUrl()));
            }

            // Delete the theater from the repository
            theaterRepository.delete(theater);

            // Return success message
            Map<String, String> response = new HashMap<>();
            response.put("message", "Theater deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the error and return an internal server error response
            logger.error("Error deleting theater: ", e);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error deleting theater.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    // Fetch all theaters
    @GetMapping("/all")
    public ResponseEntity<List<Theater>> getAllTheaters() {
        List<Theater> theaters = theaterRepository.findAll();
        return ResponseEntity.ok(theaters);
    }

    // Serve theater images
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

    // Fetch a single theater by ID
    @GetMapping("/{id}")
    public ResponseEntity<Theater> getTheaterById(@PathVariable Long id) {
        Theater theater = theaterRepository.findById(id).orElse(null);
        if (theater == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(theater);
    }
}
