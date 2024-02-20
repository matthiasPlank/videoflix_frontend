// video-upload-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-upload-dialog',
  templateUrl: './video-upload-dialog.component.html',
  styleUrls: ['./video-upload-dialog.component.scss']
})
export class VideoUploadDialogComponent {

  constructor(private dialogRef: MatDialogRef<VideoUploadDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}