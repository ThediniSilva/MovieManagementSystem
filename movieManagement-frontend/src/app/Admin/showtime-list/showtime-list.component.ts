import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowtimeService } from '../../Services/showtime.service';
import { Showtime } from '../../models/showtime.model';
import { UpdateShowtimeDialogComponent } from '../update-showtime-dialog/update-showtime-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showtime-list',
  imports: [CommonModule],
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {
  showtimes: Showtime[] = [];
  errorMessage: string = '';

  constructor(private showtimeService: ShowtimeService, private dialog: MatDialog) {}

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
        next: () => {
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

  openUpdateDialog(showtime: Showtime): void {
    const dialogRef = this.dialog.open(UpdateShowtimeDialogComponent, {
      width: '400px',
      data: showtime
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateShowtime(result);
      }
    });
  }

  updateShowtime(updatedShowtime: Showtime): void {
    this.showtimeService.updateShowtime(updatedShowtime).subscribe({
      next: () => this.fetchShowtimes(),
      error: (err) => {
        console.error('Failed to update showtime:', err);
        this.errorMessage = 'Failed to update showtime.';
      }
    });
  }
  addSeats(showtimeId: number): void {
    // Redirect to the page where seats can be added, passing the showtimeId
    window.location.href = `/add-seats/${showtimeId}`;
  }
}
