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

  constructor(private http: HttpClient, private videoService: VideoService) {

  }
  /*
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file); formData
      this.http.post('http://127.0.0.1:8000/video/', formData).subscribe((res: any) => {
        debugger
      });
    }
  }
  */

  async uploadVideo(videoFile: File): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        }
    }

    return fetch("http://127.0.0.1:8000/video/", requestOptions)
    .then(response => response.json())
    .then(result => {

        console.log("result from backend");
        console.log(result);
        return result
    })
    .catch(error => {
      console.log('error', error);
      return new Video();
    })
  }
  

  handleFileInput(event: any): void {
    const videoFile: File = event.target.files[0];
    this.uploadVideo(videoFile)
      .then(() => {
        // Call your function to refresh the list of videos or perform any other actions
        this.videoService.getAllVideos();
      })
      .catch(error => {
        // Handle the error, e.g., show an error message to the user
      });
  }

}


