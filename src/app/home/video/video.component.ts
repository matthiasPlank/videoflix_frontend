import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { NgOptimizedImage } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs';

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

  async ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.video = this.videoService.getVideoByID(id);

    if (this.video.id == "") {
      await this.getVideoFromBackend(id);
    }
  }

  switchToQuality(quality: number): void {
    const videoURL = this.video.video_file;
    const sublength: number = videoURL.length - 4;
    const newVideoURL = videoURL.substring(0, sublength) + `_` + quality + `p.mp4`;

    let videoSource = document.getElementById("videoSource")?.setAttribute("src", newVideoURL);
    this.myVideo.nativeElement.load();
  }


  async getVideoFromBackend(id: string) {
    try{
      this.video = await this.videoService.getVideoFromBackeendByID(id); 
      this.myVideo.nativeElement.load();
    } catch (error) {
          console.error("An error occurred while fetching videos:", error);
    }
  }
}




