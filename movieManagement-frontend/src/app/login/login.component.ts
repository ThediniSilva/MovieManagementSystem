import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService,LoginResponse } from '../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (res: LoginResponse) => {
        console.log('Login successful:', res); // Debugging log
        localStorage.setItem('token', res.token); // Save JWT token
  
        const isAdmin = res.admin; // Now using "admin" instead of "isAdmin"
        console.log('isAdmin:', isAdmin); // Debugging log to check value
  
        // Store isAdmin in local storage (optional)
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  
        // Redirect based on isAdmin value
        if (isAdmin) {
          this.router.navigate(['/admin']); // Redirect admin users
        } else {
          this.router.navigate(['/home']); // Redirect regular users
        }
      },
      error: (err) => {
        console.error('Login failed:', err.error || err.message);
      }
    });
  }
  
  
  
  
  
}
