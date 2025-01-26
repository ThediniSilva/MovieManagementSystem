import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
})
export class DeleteConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true); // Notify the parent to delete the user
  }

  cancelDelete() {
    this.dialogRef.close(false); // Cancel deletion
  }
}
