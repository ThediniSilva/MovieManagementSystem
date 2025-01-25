import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  name: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  showAlert: boolean = false; // Controls alert visibility
  isError: boolean = false; // Differentiates success and error alerts

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      contactNumber: this.contact,
      password: this.password,
    };

    this.userService.addUser(user).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.isError = false;
        this.showAlert = true;
      },
      (error) => {
        this.errorMessage =
          error.error.message || 'An error occurred during registration.';
        this.successMessage = '';
        this.isError = true;
        this.showAlert = true;
      }
    );
  }

  onCloseAlert() {
    // Clear form fields and hide the alert
    this.name = '';
    this.email = '';
    this.contact = '';
    this.password = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.showAlert = false;
  }
}
