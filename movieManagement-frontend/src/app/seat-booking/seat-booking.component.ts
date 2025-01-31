import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
   imports: [ CommonModule],
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent implements OnInit {
  movieId: number = 0; // Initialize with default value

  seats: any[] = [];
  selectedSeats: number[] = [];
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.loadSeats();
  }

  loadSeats() {
    this.http.get(`/api/seats/${this.movieId}`).subscribe((data: any) => {
      this.seats = data;
    });
  }

  toggleSeatSelection(seat: any) {
    if (seat.isBooked) return;
    if (this.selectedSeats.includes(seat.id)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.id);
    } else {
      this.selectedSeats.push(seat.id);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedSeats.length * 5 + 2; // $2 service charge
  }

  bookSeats() {
    const token = localStorage.getItem('token');
    this.http.post(
      `/api/seats/book`,
      { movieId: this.movieId, seatIds: this.selectedSeats, serviceCharge: 2 },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe(() => {
      alert('Seats booked successfully!');
      this.loadSeats();
    });
  }
}
