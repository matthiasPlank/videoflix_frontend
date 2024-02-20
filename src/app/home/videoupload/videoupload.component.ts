import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { VideoUploadDialogComponent } from '../video-upload-dialog/video-upload-dialog.component';;

@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss'
})
export class VideouploadComponent {
  title: string  = "" ;
  description: string = "" ;
  video_file!: File ;
  poster_file!: File ;
  genre: string = "" ;

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,){

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

 

  addVideo(){
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('description', this.description);
    uploadData.append('video_file', this.video_file);
    uploadData.append('poster_file', this.poster_file);
    uploadData.append('poster_file', this.poster_file);
    uploadData.append('genre', this.genre);
    this.http.post('http://127.0.0.1:8000/video/', uploadData).subscribe(
      data => {console.log(data);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      },
      error => console.log(error)

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


