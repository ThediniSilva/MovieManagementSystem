package com.example.MovieTicketBookingSystem.controller;

import com.example.MovieTicketBookingSystem.entity.LoginResponse;
import com.example.MovieTicketBookingSystem.entity.User;
import com.example.MovieTicketBookingSystem.security.JwtUtil;
import com.example.MovieTicketBookingSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	 @Autowired
	    private UserService userService;

	    @Autowired
	    private JwtUtil jwtUtil;

	    // Register a new user
	    @PostMapping("/register")
	    public ResponseEntity<Object> registerUser(@RequestBody User user) {
	        try {
	            userService.registerUser(user);
	            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage("User registered successfully!"));
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(e.getMessage()));
	        }
	    }
	    @PostMapping("/login")
	    public ResponseEntity<Object> loginUser(@RequestBody User user) {
	        User existingUser = userService.findByEmail(user.getEmail());

	        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
	            // ✅ Generate token with userId
	            String token = jwtUtil.generateToken(existingUser.getEmail(), existingUser.getId());

	            boolean isAdmin = "admin@gmail.com".equals(user.getEmail());

	            return ResponseEntity.ok(new LoginResponse(token, isAdmin, existingUser.getId()));
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                    .body(new ResponseMessage("Invalid email or password"));
	        }
	    }

	    // ResponseMessage class for structured response
	    public class ResponseMessage {
	        private String message;

	        public ResponseMessage(String message) {
	            this.message = message;
	        }

	        public String getMessage() {
	            return message;
	        }

	        public void setMessage(String message) {
	            this.message = message;
	        }
	    }

	    // JwtResponse class to send token in response
	    public class JwtResponse {
	        private String token;

	        public JwtResponse(String token) {
	            this.token = token;
	        }

	        public String getToken() {
	            return token;
	        }

	        public void setToken(String token) {
	            this.token = token;
	        }
	    }
    // Get user details by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(user);
    }

    // Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {
        try {
            userService.updateUser(id, user);
            return ResponseEntity.ok("User updated successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Delete a user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user.");
        }
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(users);
    }
    
 // Get the current user's profile
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            // Extract email from the JWT token
            String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));

            // Fetch user details using the email
            User user = userService.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}