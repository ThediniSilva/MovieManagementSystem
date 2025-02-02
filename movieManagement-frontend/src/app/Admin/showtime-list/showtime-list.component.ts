import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from '../../Services/showtime.service';
import { Showtime } from '../../models/showtime.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showtime-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {
  showtimes: Showtime[] = [];
  errorMessage: string = '';

  constructor(private showtimeService: ShowtimeService) {}

  ngOnInit(): void {
    this.fetchShowtimes();
  }

  fetchShowtimes(): void {
    this.showtimeService.getAllShowtimes().subscribe({
      next: (data: Showtime[]) => {
        this.showtimes = data;
        if (this.showtimes.length === 0) {
          this.errorMessage = 'No showtimes available.';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('Error fetching showtimes:', err);
        this.errorMessage = 'Error fetching showtimes.';
      }
    });
  }

  deleteShowtime(id: number): void {
    if (confirm('Are you sure you want to delete this showtime?')) {
      this.showtimeService.deleteShowtime(id).subscribe({
        next: (response: string) => {
          alert('Showtime deleted successfully!');
          this.fetchShowtimes();
        },
        error: (err) => {
          console.error('Failed to delete showtime:', err);
          this.errorMessage = 'Failed to delete showtime.';
        }
      });
    }
  }
}
