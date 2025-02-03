import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
