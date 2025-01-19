import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) {}

  /**
   * Get all movies.
   */
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  /**
   * Delete a movie by ID.
   * @param id Movie ID to delete.
   */
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/movies/${id}`);
  }
  

  /**
   * Update a movie.
   * @param id Movie ID to update.
   * @param formData FormData with updated movie details.
   */
  updateMovie(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, formData);
  }
  
}
