import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TheaterService } from '../../Services/theater.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgForm, FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-theater-dialog',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './update-theater-dialog.component.html',
  styleUrls: ['./update-theater-dialog.component.scss']
})
export class UpdateTheaterDialogComponent {
  theater: any;
  selectedImage: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateTheaterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private theaterService: TheaterService
  ) {
    this.theater = { ...data.theater }; // Copy theater data
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  updateTheater() {
    const formData = new FormData();
    formData.append('name', this.theater.name);
    formData.append('location', this.theater.location);
    formData.append('seatCount', this.theater.seatCount);
    formData.append('features', this.theater.features);
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.theaterService.updateTheater(this.theater.id, formData).subscribe({
      next: (response) => {
        alert('Theater updated successfully!');
        this.dialogRef.close(this.theater); // **Return updated theater data**
      },
      error: () => {
        alert('Error updating theater!');
      },
    });
  }
}
