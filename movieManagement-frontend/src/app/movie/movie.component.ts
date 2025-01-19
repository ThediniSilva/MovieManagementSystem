import { Component, OnInit } from '@angular/core';
import { MovieService } from '../Services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  imports: [CommonModule,  RouterModule] 
})
export class MovieComponent implements OnInit {

  movies: any[] = []; // Array to hold movie data

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies(); // Fetch movies when component loads
  }

 /**
   * Fetch movies from the backend.
   */
 fetchMovies(): void {
  this.movieService.getMovies().subscribe(
    (data: any[]) => {
      this.movies = data.map(movie => ({
        ...movie,
        imageUrl: `http://localhost:8080/api/movies/image/${movie.imageUrl}`
      }));
    },
    (error) => {
      console.error('Error fetching movies:', error);
    }
  );
}

  /**
   * Handle the deletion of a movie.
   * @param id Movie ID to delete.
   * @param index Index of the movie in the array.
   */
  deleteMovie(id: number, index: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          // Success: Remove the movie from the array and show success alert
          this.movies.splice(index, 1);
          alert('Movie deleted successfully.');
        },
        error: (error) => {
          // Error: Log the error and inform the user
          console.error('Error deleting movie:', error);
          alert('Failed to delete the movie.');
        },
      });
    }
  }
  
  

  /**
   * Handle editing a movie.
   * @param movie Movie object to edit.
   */
  editMovie(movie: any): void {
    // Navigate to update form or open modal for editing
    alert(`Edit functionality for movie: ${movie.title} is not implemented yet.`);
  }
}
