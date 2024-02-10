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
    this.videos = []; 
   return fetch("http://127.0.0.1:8000/video/", requestOptions)
      .then(response => response.json())
      .then(result => {
        result.forEach((video: any) => {
          this.videos.push(video); 
        });
        return this.videos; 
      })
      .catch(error => {
        console.error('error', error);
        return this.videos; 
      })
  }

  getVideoByID(id:string){
    this.getAllVideos(); 
    const vid = this.videos.find((video) => video.id == id); 
    if(vid){
      return vid; 
    }
    else{
      return new Video(); 
    }
  }

  async getVideoFromBackeendByID(id:string){
    const requestOptions = { 
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        } 
    } 

    return fetch("http://127.0.0.1:8000/video/" + id , requestOptions)
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
}
