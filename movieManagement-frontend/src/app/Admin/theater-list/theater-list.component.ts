import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../Services/theater.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTheaterDialogComponent } from '../update-theater-dialog/update-theater-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theater-list',
   imports: [CommonModule],
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.scss'],
})
export class TheaterListComponent implements OnInit {
  theaters: any[] = [];

  constructor(public theaterService: TheaterService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTheaters();
  }

  loadTheaters() {
    this.theaterService.getTheaters().subscribe({
      next: (data) => {
        this.theaters = data;
      },
      error: (err) => {
        console.error('Error fetching theaters:', err);
      },
    });
  }

  openUpdateDialog(theater: any) {
    const dialogRef = this.dialog.open(UpdateTheaterDialogComponent, {
      width: '900px',  // Increased width
      height: '500px', // Increased height
      data: { theater }
    });

    dialogRef.afterClosed().subscribe((updatedTheater) => {
      if (updatedTheater) {
        // **Update the theater list immediately without refresh**
        const index = this.theaters.findIndex(t => t.id === updatedTheater.id);
        if (index !== -1) {
          this.theaters[index] = updatedTheater;
        }
      }
    });
  }

  deleteTheater(id: number) {
    if (confirm('Are you sure you want to delete this theater?')) {
      this.theaterService.deleteTheater(id).subscribe({
        next: (response) => {
          this.theaters = this.theaters.filter(theater => theater.id !== id);
          alert('Theater deleted successfully!');
        },
        error: () => {
          alert('Error deleting theater.');
        }
      });
    }
  }
}
