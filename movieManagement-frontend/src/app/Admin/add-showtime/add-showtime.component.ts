import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShowtimeService} from '../../Services/showtime.service';
import { TheaterService} from '../../Services/theater.service';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-add-showtime',
  standalone: true, // Use standalone if you're on Angular 14+; otherwise, declare in module
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-showtime.component.html',
  styleUrls: ['./add-showtime.component.scss']
})
export class AddShowtimeComponent implements OnInit {
  showtimeForm!: FormGroup;
  movies: any[] = [];
  theaters: any[] = [];
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private showtimeService: ShowtimeService,
    private movieService: MovieService,
    private theaterService: TheaterService
  ) {}

  ngOnInit(): void {
    // Build the form with validation rules
    this.showtimeForm = this.fb.group({
      movieId: ['', Validators.required],
      theaterId: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadMoviesAndTheaters();
  }

  loadMoviesAndTheaters(): void {
    // Load movies (assumes you have a movie service with getMovies())
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });

    // Load theaters (assumes you have a theater service with getTheaters())
    this.theaterService.getTheaters().subscribe(data => {
      this.theaters = data;
    });
  }

  addShowtime(): void {
    if (this.showtimeForm.valid) {
      this.showtimeService.addShowtime(this.showtimeForm.value).subscribe(
        response => {
          this.message = response;
          this.showtimeForm.reset();
        },
        error => {
          console.error('Error adding showtime:', error);
          this.message = 'Failed to add showtime.';
        }
      );
    }
  }
}
