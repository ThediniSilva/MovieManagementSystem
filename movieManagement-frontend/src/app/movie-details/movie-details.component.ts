import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Showtime } from '../models/showtime.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  showtimes: Showtime[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchShowtimes();
  }

  fetchShowtimes() {
    this.http.get<Showtime[]>(`http://localhost:8080/api/showtimes/movie/${this.movieId}`)
      .subscribe({
        next: (data) => {
          if (data.length === 0) {
            this.errorMessage = 'No showtimes available for this movie.';
          } else {
            this.showtimes = data;
            this.errorMessage = '';
          }
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'No showtimes available for this movie.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again later.';
          }
        }
      });
  }
}
