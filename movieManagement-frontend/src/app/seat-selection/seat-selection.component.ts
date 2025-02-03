import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeatService } from '../Services/seat.service';
import { Seat } from '../models/seat.model';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-seat-selection',
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  showtimeId: number = 0;
  seats: Seat[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService
  ) {}

  ngOnInit(): void {
    // Get the showtimeId from the route parameters
    this.route.params.subscribe(params => {
      this.showtimeId = +params['id']; // Convert string to number
      this.fetchAvailableSeats();
    });
  }

  fetchAvailableSeats(): void {
    this.seatService.getAvailableSeats(this.showtimeId).subscribe({
      next: (data: Seat[]) => {
        this.seats = data;
        this.errorMessage = this.seats.length ? '' : 'No seats available.';
      },
      error: () => this.errorMessage = 'Error fetching available seats.'
    });
  }
}
