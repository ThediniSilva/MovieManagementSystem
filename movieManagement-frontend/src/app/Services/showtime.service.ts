import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addtime } from '../models/addtime.model';
import { Showtime } from '../models/showtime.model';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private apiUrl = 'http://localhost:8080/api/showtimes';

  constructor(private http: HttpClient) {}
  addShowtime(showtimeData: any): Observable<string> {
    // Transform form value to match backend expected structure
    const payload = {
      startDate: showtimeData.startDate,
      startTime: showtimeData.startTime,
      ticketPrice: Number(showtimeData.ticketPrice),
      movie: { id: Number(showtimeData.movieId) },
      theater: { id: Number(showtimeData.theaterId) }
    };

    // Specify responseType: 'text' to get a plain text response
    return this.http.post<string>(`${this.apiUrl}/add`, payload, { responseType: 'text' as 'json' });
  }

  getAllShowtimes(): Observable<Showtime[]> {
    return this.http.get<Showtime[]>(`${this.apiUrl}/all`);
  }
  
  deleteShowtime(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
  updateShowtime(showtime: Showtime): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${showtime.id}`, showtime, { responseType: 'text' });
  }

  
}
