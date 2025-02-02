import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Showtime } from '../../models/showtime.model';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    // other imports
  ],
  selector: 'app-update-showtime-dialog',
  templateUrl: './update-showtime-dialog.component.html',
  styleUrls: ['./update-showtime-dialog.component.scss']
})
export class UpdateShowtimeDialogComponent {
  updateShowtimeForm: FormGroup;

  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateShowtimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Showtime
  ) {
    this.updateShowtimeForm = this.fb.group({
      startDate: [data.startDate, Validators.required],
      startTime: [data.startTime, Validators.required],
      ticketPrice: [data.ticketPrice, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.updateShowtimeForm.valid) {
      const updatedShowtime = { ...this.data, ...this.updateShowtimeForm.value };
      this.dialogRef.close(updatedShowtime);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
