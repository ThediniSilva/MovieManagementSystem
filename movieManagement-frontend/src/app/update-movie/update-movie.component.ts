import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../Services/movie.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-update-movie',
  imports: [
    CommonModule, // Add CommonModule here
    FormsModule // Also ensure FormsModule is added if you are using ngModel
  ],
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss'],
})
export class UpdateMovieComponent implements OnInit {
  selectedMovie: any = null; // Movie object to bind to the form
  selectedFile: File | null = null; // File selected for upload

  constructor(private route: ActivatedRoute, private movieService: MovieService,private router: Router) {}

  ngOnInit(): void {
    // Get the movie ID from the route and fetch the movie details
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.fetchMovieDetails(+movieId);
    }
  }
  fetchMovieDetails(id: number): void {
    this.movieService.getMovieById(id).subscribe(
      (data) => {
        this.selectedMovie = data; // Bind the movie data to the form
        console.log('Fetched movie details:', data);
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        alert(`Failed to fetch movie details. Status: ${error.status}`);
      }
    );
  }
  

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Store the selected file
  }

  updateMovieDetails() {
    const formData = new FormData();
    formData.append('title', this.selectedMovie.title);
    formData.append('genre', this.selectedMovie.genre);
    formData.append('duration', this.selectedMovie.duration.toString());
    formData.append('director', this.selectedMovie.director);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // Include image if selected
    }
  
    this.movieService.updateMovie(this.selectedMovie.id, formData).subscribe({
      next: (response: string) => {
        console.log('Update successful:', response);
        alert('Movie updated successfully!');
        this.router.navigate(['/movies']); // Navigate to the movie page
      },
      error: (error) => {
        console.error('Error updating movie:', error);
        if (error.status === 404) {
          alert('Movie not found. Please check the movie ID.');
        } else if (error.status === 500) {
          alert('Server error occurred. Please try again later.');
        } else {
          alert('Movie updated successfully!!');
          this.router.navigate(['/movie']); // Navigate to the movie page
        }
      },
    });
  }
  
  

  cancelUpdate(): void {
    // Navigate back or reset the form
    history.back();
  }
}
