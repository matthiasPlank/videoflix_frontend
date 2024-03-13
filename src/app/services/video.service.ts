import { Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';
import { Video } from '../models/video.class';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  loadedVideosSubject = new Subject<Video[]>();
  videos$ = this.loadedVideosSubject.asObservable();
  videos: Video[] = []; 
  backendURL:string = environment.apiUrl; 

  constructor(private httpClient:HttpClient) { 
  }

  /**
   *Get all Videos from backend
   * @returns Array with all Video Elements
   */
  async getAllVideos() {
    const requestOptions = { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      } 
    };
  
    try {
      const response$ = this.httpClient.get(this.backendURL + "/video/", requestOptions); 
      this.videos = await lastValueFrom(response$) as Video[];
      return  await lastValueFrom(response$) as Video[];

    } catch (error) {
      console.error("An error occurred while fetching videos:", error);
      throw error; // Rethrow the error to be caught by the caller
      return []; 
    }
  }

  /**
   * Search Video for given id in local video array
   * @param id - video id
   * @returns video object 
   */
  getVideoByID(id:string){
   
    //this.getAllVideos(); 
    const vid = this.videos.find((video) => video.id == id); 
    
    if(vid){
      return vid; 
    }
    else{
      return new Video(); 
    }
  }

  /**
   * Gets video by id from backend
   * @param id - video id 
   * @returns vidoe object 
   */
  async getVideoFromBackeendByID(id:string){
    
    const requestOptions = { 
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        } 
    } 
    try {
      const response$ = this.httpClient.get(this.backendURL + "/video/" + id + "/", requestOptions)   
      return  await lastValueFrom(response$) as Video;
    } catch (error) {
      console.error("An error occurred while fetching videos:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
}
