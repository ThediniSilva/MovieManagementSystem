import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  private apiUrl = 'http://localhost:8080/api/theaters';

  constructor(private http: HttpClient) {}

  getTheaters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getTheaterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addTheater(theaterData: FormData): Observable<string> {
    return this.http.post('http://localhost:8080/api/theaters/add', theaterData, { responseType: 'text' });
  }

  updateTheater(id: number, theaterData: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/update/${id}`, theaterData, { responseType: 'text' });
  }
  

  deleteTheater(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${id}`);
  }
  
  getImageUrl(fileName: string): string {
    return `${this.apiUrl}/image/${fileName}`;
  }
}




