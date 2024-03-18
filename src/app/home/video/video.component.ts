import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { NgIf, NgOptimizedImage } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgOptimizedImage, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

  video: Video = new Video();
  @ViewChild('myVideo')
  myVideo!: ElementRef;
  currentTime: number = 0;
  checkAvailabilityCurrently = false; 
  isVideoAvailable = false; 
  isVideoAvailable_480p = false; 
  isVideoAvailable_720p = false; 

  constructor(private route: ActivatedRoute, private videoService: VideoService, private http: HttpClient, private router: Router) { }

  /**
   * Gets id from url params and opens video. 
   */
  async ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.video = await this.videoService.getVideoByID(id);

    if (this.video.id == "") {
      await this.getVideoFromBackend(id);
    }
    await this.checkVideoAvailability(this.video.video_file).then((result) => { 
      this.isVideoAvailable = result; 
    });
    await this.checkVideoAvailability(this.getFilePathforVideo(this.video.video_file , "480")).then((result) => { 
      this.isVideoAvailable_480p = result; 
    });
    await this.checkVideoAvailability(this.getFilePathforVideo(this.video.video_file , "720")).then((result) => { 
      this.isVideoAvailable_720p = result; 
    });
  }

  /**
   * Changes video url path in html template and shows video with selected resolution.
   * @param quality - quality level (480, 720)
   */
  switchToQuality(quality: number): void {
    
    const videoURL = this.video.video_file;
    const sublength: number = videoURL.length - 4;
    const newVideoURL = videoURL.substring(0, sublength) + `_` + quality + `p.mp4`;
    
    let videoSource = document.getElementById("videoSource")?.setAttribute("src", newVideoURL);
    this.myVideo.nativeElement.load();
    this.myVideo.nativeElement.currentTime = this.currentTime;
  }

  /**
   * Changes video url path in html template and shows original video resolution.
   */
  switchToOriginal(): void {
    
    let videoSource = document.getElementById("videoSource")?.setAttribute("src", this.video.video_file);
    this.myVideo.nativeElement.load();
    this.myVideo.nativeElement.currentTime = this.currentTime;
  }

  /**
   * Set current time from video 
   * @param data - current time of played video
   */
  setCurrentTime(data: any) {
    this.currentTime = data.target.currentTime;
  }

  /**
   * Fetches video from backend. 
   * @param id - id of selected video
   */
  async getVideoFromBackend(id: string) {
    try {
      this.video = await this.videoService.getVideoFromBackeendByID(id);
      this.myVideo.nativeElement.load();
    } catch (error) {
      console.error("An error occurred while fetching videos:", error);
    }
  }

  /**
   * Close Video and goes back to homescreen 
   */
  backToHome() {
    this.router.navigateByUrl("/home");
  }

  /**
   * Checks if video file path is available
   * @param src - video path
   */
  async checkVideoAvailability(src: string): Promise<boolean> {
    this.checkAvailabilityCurrently = true;

    return new Promise<boolean>((resolve, reject) => {
        this.http.head(src)
            .subscribe({
                next: (v) => {
                    this.checkAvailabilityCurrently = false;
                    resolve(true);
                },
                error: (e) => {
                    this.checkAvailabilityCurrently = false;
                    console.error(e);
                    resolve(false);
                }
            });
    });
}


  getFilePathforVideo(path:string , quality: string){
    const sublength: number = path.length - 4;
    return path.substring(0, sublength) + `_` + quality + `p.mp4`;
  }

  canplay(event: Event){
    console.log("CanPlay Event:")
    console.log(event);
  }

  errorDuringPlay(event: Event){
    console.log("Error Event:")
    console.log(event);
  }
}



