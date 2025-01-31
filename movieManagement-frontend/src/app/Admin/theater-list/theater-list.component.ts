import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../../Services/theater.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theater-list',
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.scss'],
})
export class TheaterListComponent implements OnInit {
  theaters: any[] = [];

  constructor(public theaterService: TheaterService) {}


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

  deleteTheater(id: number) {
    if (confirm('Are you sure you want to delete this theater?')) {
      this.theaterService.deleteTheater(id).subscribe({
        next: (response) => {
          this.theaters = this.theaters.filter(theater => theater.id !== id);
          alert(response.message); // Use the message from the backend
        },
        error: () => {
          alert('Error deleting theater.');
        }
      });
    }
  }
  
}
