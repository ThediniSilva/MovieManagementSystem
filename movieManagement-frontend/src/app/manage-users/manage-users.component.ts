import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';


@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  isEditing: boolean = false;
  selectedUser: any = {};
  errorMessage: string = '';

  constructor(private userService: UserService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchUsers();
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
