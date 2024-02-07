import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from '../models/video.class';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  loadedVideosSubject = new Subject<Video[]>();
  videos$ = this.loadedVideosSubject.asObservable();
  videos: Video[] = []

  constructor() { 
   
  }


  async getAllVideos(){
    const requestOptions = { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          } 
    } 

   return fetch("http://127.0.0.1:8000/video/", requestOptions)
      .then(response => response.json())
      .then(result => {
        result.forEach((video: any) => {
          console.log("LoadedVideo:"); 
          console.log(video); 
          this.videos.push(video); 
        });
      
        return this.videos; 
      })
      .catch(error => {
        console.log('error', error);
        return this.videos; 
      })
  }
}
