import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { VideoUploadDialogComponent } from '../video-upload-dialog/video-upload-dialog.component';;
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule , MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule],
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

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private modalService: ModalService) {
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
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('description', this.description);
    uploadData.append('video_file', this.video_file);
    uploadData.append('poster_file', this.poster_file);
    uploadData.append('genre', this.genre);
    // if (this.video_480p_file !== null) {
    //   uploadData.append('video_480p_file', this.video_480p_file);
    // }

    // if (this.video_720p_file !== null) {
    //   uploadData.append('video_720p_file', this.video_720p_file);
    // }
    this.http.post('http://127.0.0.1:8000/video/', uploadData).subscribe(
      (data: any) => {
        console.log('Success:', data);
        // Update the frontend video_480p_file and video_720p_file values with the actual file paths
        this.updateVideoFiles(data.id);
        // ... (rest of the code)
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error, display a message to the user, or log more details
      }
    );
  }

  updateVideoFiles(videoId: number) {
    // Perform an API request to get the updated video details, including file paths
    this.http.get(`http://127.0.0.1:8000/video/${videoId}`).subscribe(
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


