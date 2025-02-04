import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeatService } from '../Services/seat.service';
import { Seat } from '../models/seat.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-seat-selection',
  imports:[CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  showtimeId: number = 0;
  seats: Seat[] = [];
  selectedSeats: Seat[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService,
    private authService: AuthService,   // Inject AuthService to get the logged-in userId
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.showtimeId = +params['id']; // Convert string to number
      this.fetchAvailableSeats();
    });
  }

  fetchAvailableSeats(): void {
    console.log('Fetching seats for showtimeId:', this.showtimeId); // Debug log
    this.seatService.getAvailableSeats(this.showtimeId).subscribe({
      next: (data: Seat[]) => {
        console.log('Fetched seats:', data); // Log the response
        this.seats = data;
        this.errorMessage = this.seats.length ? '' : 'No seats available.';
      },
      error: (err) => {
        console.error('Error fetching available seats:', err); // Debug error
        this.errorMessage = 'Error fetching available seats.';
      }
    });
  }
  

  selectSeat(seat: Seat): void {
    if (!seat.reserved) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => s.seatNumber !== seat.seatNumber);
      }
      // console.log('Selected seats:', this.selectedSeats); // Debug log
    }
  }
  

  bookSeats(): void {
    if (this.selectedSeats.length) {
      const selectedSeatIds = this.selectedSeats.map(seat => seat.id);
      const userId = this.authService.getUserId(); // Fetch logged-in user's ID
  
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }
  
      this.seatService.bookSeats(userId, selectedSeatIds).subscribe({
        next: () => {
          this.selectedSeats.forEach(seat => {
            seat.reserved = true;
            seat.selected = false; 
          });
          this.selectedSeats = [];
          alert("Seats booked successfully!");
        },
        error: (err) => {
          console.error("Booking error:", err);
          alert("Error booking seats. Please try again.");
        }
      });
    }
  }
  
  
  
  
  
}
