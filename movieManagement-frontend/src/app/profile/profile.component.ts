import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../Services/user.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // Holds the user details
  users: any[] = [];
  isEditing: boolean = false;
  selectedUser: any = {};
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService,private userService: UserService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getProfile();
    this.fetchUsers();
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

  
  
    fetchUsers() {
      this.userService.getAllUsers().subscribe(
        (data) => {
          this.users = data; // Assign fetched users to the local array
        },
        (error) => {
          this.errorMessage = 'Error fetching users. Please try again later.';
          console.error('Error fetching users:', error);
        }
      );
    }
  
    editUser(user: any) {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
        width: '600px', // Adjust the width
        height: '400px', // Adjust the height
        data: { user },
      });
    
      dialogRef.afterClosed().subscribe((updatedUser) => {
        if (updatedUser) {
          // Update the user in the list without a page refresh
          const index = this.users.findIndex((u) => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        }
      });
    }
    
    deleteUser(userId: number) {
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        height: '200px',
      });
    
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.userService.deleteUser(userId).subscribe(
            () => {
              // After successful deletion, re-fetch the users list from the backend
              this.fetchUsers(); // This will reload the list of users
            },
            (error) => {
              this.errorMessage = 'Error deleting user. Please try again.';
              console.error('Error deleting user:', error);
            }
          );
        }
      });
    }
}
