import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.class';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {


  video: Video = new Video(); 


  constructor(private route: ActivatedRoute , private videoService:VideoService) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"]; 
    this.video = this.videoService.getVideoByID(id); 
    console.log("Video to play:");
    console.log(this.video);
    
   }




}
