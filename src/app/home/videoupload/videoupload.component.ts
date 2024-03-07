import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule,
    CommonModule, MatDialogContent,
    MatDialogActions, MatDialogClose,
    MatButtonModule, MatDialogModule,
    MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss',
})
export class VideouploadComponent implements OnDestroy {
  title: string = "";
  description: string = "";
  video_file!: File;
  poster_file!: File;
  genre: string = "";
  isModalVisible: boolean = true;
  private modalSubscription: Subscription;
  video_480p_file: string | null = null;
  video_720p_file: string | null = null;
  uploading: boolean = false;
  backendURL = environment.apiUrl; 

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private modalService: ModalService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VideouploadComponent>
  ) {
    this.modalSubscription = this.modalService.openModal$.subscribe(() => {
      this.openModal();
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }
  onDescriptionChanged(event: any) {
    this.description = event.target.value;
  }
  onVideofileChanged(event: any) {
    this.video_file = event.target.files[0];
  }
  onPosterfileChanged(event: any) {
    this.poster_file = event.target.files[0];
  }

  onGenreChanged(event: any) {
    this.genre = event.target.value
  }

  addVideo() {
    this.uploading = true;
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('description', this.description);
    uploadData.append('video_file', this.video_file);
    uploadData.append('poster_file', this.poster_file);
    uploadData.append('genre', this.genre);

    this.http.post(this.backendURL + '/video/', uploadData).subscribe(
      (data: any) => {
        console.log('Success:', data);
        const snackBarConfig: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',  // Set to 'bottom' or 'top'
          panelClass: 'custom-snackbar'  // Add a custom class for styling
        };
        this.dialogRef.close();
        this.uploading = false;
        this.snackBar.open('Video uploaded successfully!', 'Close', snackBarConfig);
      },
      (error) => {
        console.error('Error:', error);
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (error.status === 400) {
          errorMessage = 'Bad Request. Please check your input.';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized. You are not authenticated.';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden. You do not have permission to perform this action.';
        } else if (error.status === 404) {
          errorMessage = 'Not Found. The requested resource could not be found.';
        } else if (error.status === 500) {
          errorMessage = 'Internal Server Error. Please try again later.';
        }

        const snackBarConfig: MatSnackBarConfig = {
          duration: 5000, // Adjust the duration as needed
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'custom-snackbar-error'  // Add a custom class for styling errors
        };

        this.snackBar.open(errorMessage, 'Close', snackBarConfig);
        this.uploading = false;
      }
    );
  }

  updateVideoFiles(videoId: number) {
    // Perform an API request to get the updated video details, including file paths
    this.http.get(this.backendURL + `/video/${videoId}`).subscribe(
      (data: any) => {
        // Update the video_480p_file and video_720p_file values in your component

        this.video_480p_file = data.video_480p_file;
        this.video_720p_file = data.video_720p_file;
      },
      (error) => {
        console.error('Error fetching updated video details:', error);
        // Handle the error, display a message to the user, or log more details
      }
    );
  }

  /*
  refactoring option here:
  onInputChanged(event: any, property: string) {
    switch (property) {
      case 'title':
      case 'description':
        this[property] = event.target.value;
        break;
      case 'video_file':
      case 'poster_file':
        this[property] = event.target.files[0];
        break;
      case 'created_at':
        this[property] = new Date(event.target.value);
        break;
      case 'genre':
        this.genre = event.target.value;
        break;
      default:
        break;
    }
  }
  */

}


