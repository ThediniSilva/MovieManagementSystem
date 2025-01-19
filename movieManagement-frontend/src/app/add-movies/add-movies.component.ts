import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddMoviesComponent {
  @ViewChild('movieForm') movieForm!: NgForm; // ViewChild to access the form

  movie = {
    title: '',
    genre: '',
    duration: 0,
    director: '',
  };
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select an image file!');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.movie.title);
    formData.append('genre', this.movie.genre);
    formData.append('duration', this.movie.duration.toString());
    formData.append('director', this.movie.director);
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:8080/api/movies/add', formData, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        alert(response);
        this.resetForm(); // Call resetForm after successful submission
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('Failed to add the movie.');
      },
    });
  }

  resetForm() {
    if (this.movieForm) {
      this.movieForm.resetForm(); // Reset form fields
    }
    this.movie = {
      title: '',
      genre: '',
      duration: 0,
      director: '',
    };
    this.selectedFile = null;
  }
}
