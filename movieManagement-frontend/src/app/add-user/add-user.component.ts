import { Component ,} from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';  // Add this import
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',


})
export class AddUserComponent {
  name: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}  // Add the Router here

  onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      contactNumber: this.contact,
      password: this.password
    };

    this.userService.addUser(user).subscribe(
      (response) => {
        // Display success message in an alert box
        alert(response.message);  // Display success message
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        // Display error message in an alert box
        alert(error.error.message || 'An error occurred during registration.');
        this.successMessage = '';
      }
    );
    
    
  }

}
