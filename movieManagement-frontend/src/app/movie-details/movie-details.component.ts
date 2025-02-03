
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../models/showtime.model';
import { Seat } from '../models/seat.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeatService } from '../Services/seat.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  showtimes: Showtime[] = [];
  availableSeats: Seat[] = [];
  selectedShowtimeId: number | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private seatService: SeatService) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchShowtimes();
  }

  fetchShowtimes() {
    this.http.get<Showtime[]>(`http://localhost:8080/api/showtimes/movie/${this.movieId}`)
      .subscribe({
        next: (data) => {
          this.showtimes = data;
          this.errorMessage = data.length === 0 ? 'No showtimes available for this movie.' : '';
        },
        error: () => this.errorMessage = 'Something went wrong. Please try again later.'
      });
  }

   checkSeats(showtimeId: number): void {
    this.selectedShowtimeId = showtimeId;
    this.seatService.getAvailableSeats(showtimeId).subscribe({
      next: (data: Seat[]) => this.availableSeats = data,
      error: () => this.errorMessage = 'Error fetching available seats.'
    });
  }
}
