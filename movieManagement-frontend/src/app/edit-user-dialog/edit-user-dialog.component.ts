import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService
  ) {
    this.user = { ...data.user }; // Pre-fill user data
  }

  onSubmit() {
    this.userService.updateUser(this.user.id, this.user).subscribe(
      (response: string) => {
        console.log('Response:', response);  // Log the response to see the success message
        // Close the dialog with the updated user data
        this.dialogRef.close(this.user); 
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}