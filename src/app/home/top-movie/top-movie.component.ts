import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-movie',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  templateUrl: './top-movie.component.html',
  styleUrl: './top-movie.component.scss'
})
export class TopMovieComponent {

  @Input() topVideos:Video[] = []; 
  currentVideo:Video = new Video(); 
  currentVideoIndex = 0; 

  @ViewChild('topVideo')
  topVideo!: ElementRef;

  constructor(private router:Router){}

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['topVideos']) {
      if(this.topVideos.length > 0){
        this.currentVideo = this.topVideos[0]; 
      }
    }
  }

  ngOnInit(){
    setInterval(()=>{
      this.setNextVideo(); 
    }, 10000); 
  }

  /**
   * Sets next video for preview
   */
  setNextVideo(){
    if(this.topVideos.length == this.currentVideoIndex+1){
      this.currentVideoIndex = 0; 
    }
    else{
      this.currentVideoIndex++; 
    }
    this.currentVideo = this.topVideos[this.currentVideoIndex]; 
    document.getElementById("topVideoSource")?.setAttribute("src", this.currentVideo.video_file);
    this.topVideo.nativeElement.load();
  }

   /**
   * Open Video with given id
   * @param id 
   */
    openVideo(id: string) {
      this.router.navigate(['/video', id]);
    }
}
