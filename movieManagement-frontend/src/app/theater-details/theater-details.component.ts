
import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../Services/theater.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theater-list',
   imports: [CommonModule],
  templateUrl: './theater-details.component.html',
  styleUrls: ['./theater-details.component.scss'],
})
export class TheaterDetailsComponent implements OnInit {
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

 
}


