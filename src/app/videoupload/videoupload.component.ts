import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Video } from '../models/video.class';
import { VideoService } from '../services/video.service';


@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [],
  templateUrl: './videoupload.component.html',
  styleUrl: './videoupload.component.scss'
})
export class VideouploadComponent {
  title: string;
  description: string;
  video_file: File;
  poster_file: File;
  created_at: Date;
  genre: string;


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
  onDateChanged(event: any) {
    this.created_at = event.target.getDate();
  }
  onGenreChanged(event: any) {
    this.genre = event.target.value
  }

}


