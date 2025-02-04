import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  getShowtimes(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/showtimes/movie/${movieId}`);
  }

  getAvailableSeats(showtimeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/seats/${showtimeId}/available`);
  }

  bookSeats(userId: number, seatIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/seats/book`, { userId, seatIds });
  }
}
