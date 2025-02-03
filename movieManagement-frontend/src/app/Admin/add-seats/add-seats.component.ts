import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Add this import

@Component({
  selector: 'app-add-seats',
  imports: [
    // other imports
    FormsModule,  // Add FormsModule here
  ],
  templateUrl: './add-seats.component.html',
  styleUrls: ['./add-seats.component.scss']
})
export class AddSeatsComponent implements OnInit {
  showtimeId: number = 0;
  rowCount: number = 0;
  seatsPerRow: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve the showtimeId from the URL
    this.showtimeId = Number(this.route.snapshot.paramMap.get('id'));
  }

  initializeSeats(): void {
    const url = `http://localhost:8080/api/seats/${this.showtimeId}/initialize?rowCount=${this.rowCount}&seatsPerRow=${this.seatsPerRow}`;
  
    // Specify the response type as 'text'
    this.http.post(url, {}, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        // Display the success message
        alert(response);  // The response is plain text (success message)
      },
      error: (err) => {
        // Handle error
        alert('Error initializing seats.');
        console.error(err);
      }
    });
  }
  
  
}
