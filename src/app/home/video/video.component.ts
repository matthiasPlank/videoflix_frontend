import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { NgOptimizedImage } from '@angular/common'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

  video: Video = new Video();
  @ViewChild('myVideo')
  myVideo!: ElementRef;
  private apiUrl = 'http://127.0.0.1:8000/video';



  constructor(private route: ActivatedRoute, private videoService: VideoService, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    /*this.video = this.videoService.getVideoByID(id); */
    this.video = this.videoService.getVideoByID(id);

    if (this.video.id == "") {
      this.videoService.getVideoFromBackeendByID(id)
        .then(response => {
          console.log(response)
          this.video = response;
          console.log('VIDEO:', this.video);
          this.myVideo.nativeElement.load();
        })
        .catch(error => {
          console.log('error', error);
        })
    }
    //console.log("Video to play:");
    //console.log(this.video);
  }

  switchToQuality(quality: number): void {
    const id = this.route.snapshot.params["id"];
    const endpoint = `${this.apiUrl}/${this.video.id}/${quality}p/`;

    this.http.get(endpoint).subscribe(
      (response: any) => {
        console.log(`Switched to ${quality}p successfully`);
        // Handle the response as needed, update video source, etc.
      },
      (error: any) => {
        console.error(`Error switching to ${quality}p:`, error);
      }
    );
  }
}




