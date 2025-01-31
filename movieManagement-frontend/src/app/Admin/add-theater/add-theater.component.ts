import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TheaterService } from '../../Services/theater.service';
import { NgForm, FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-theater',
  standalone: true, // ✅ Add this
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.scss'],
})
export class AddTheaterComponent {
  theaterForm: FormGroup;
  selectedImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private theaterService: TheaterService) {
    this.theaterForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      seatCount: [1, [Validators.required, Validators.min(1)]], // ✅ Default 1
      features: ['', Validators.required],
      image: [null],
    });
    
  }

  onFileSelected(event: any) {
    console.log('File Selected Event:', event); // ✅ Debugging
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      console.log('Selected Image:', this.selectedImage); // ✅ Debugging
    }
  }
  

  submitForm() {
    console.log('Form Valid:', this.theaterForm.valid);
    console.log('Selected Image:', this.selectedImage);
  
    if (this.theaterForm.invalid || !this.selectedImage) {
      this.errorMessage = 'Please fill all required fields and select an image.';
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.theaterForm.get('name')?.value);
    formData.append('location', this.theaterForm.get('location')?.value);
    formData.append('seatCount', this.theaterForm.get('seatCount')?.value);
    formData.append('features', this.theaterForm.get('features')?.value);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
  
    this.theaterService.addTheater(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Theater added successfully!';
        this.errorMessage = '';
  
        // ✅ Reset the form properly
        this.theaterForm.reset(); // Clears all form fields
        this.selectedImage = null; // Clears selected image
        (document.getElementById('fileInput') as HTMLInputElement).value = ''; // Clears file input
  
        // ✅ Optionally, set default values for required fields
        this.theaterForm.patchValue({
          seatCount: 1, // Default value for seat count
        });
      },
      error: (error) => {
        this.errorMessage = 'Error adding theater. Please try again.';
        this.successMessage = '';
      },
    });
  }
  
  
}
