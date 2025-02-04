import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private baseUrl = 'http://localhost:8080/api/seats';

  constructor(private http: HttpClient) {}

  getAvailableSeats(showtimeId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.baseUrl}/${showtimeId}/available`);
  }
  bookSeats(userId: number, seatIds: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      userId,
      seatIds,
    };
  
    return this.http.post('http://localhost:8080/api/seats/book', body, { headers });
  }
  
}
