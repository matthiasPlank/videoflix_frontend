import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Video } from '../../models/video.class';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss'
})
export class VideouploadComponent {
  title: string  = "" ;
  description: string = "" ;
  video_file!: File ; 
  poster_file!: File ;
  genre: string = "" ;

  constructor(private http: HttpClient, private router: Router){

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


