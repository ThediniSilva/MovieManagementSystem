import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // Holds the user details

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getProfile();
  }

  /**
   * Fetch the profile details of the logged-in user.
   */
  getProfile() {
    // Check if we are in the browser environment before using localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
  
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
  
        this.http.get('http://localhost:8080/api/users/profile', { headers }).subscribe({
          next: (data) => {
            this.user = data; // Populate the user object with the response data
          },
          error: (err) => {
            console.error('Failed to fetch profile:', err);
          }
        });
      } else {
        console.error('No token found, unable to fetch profile.');
      }
    }
  }
  

  /**
   * Log out the user.
   */
  logout() {
    this.authService.logout();
  }
}
