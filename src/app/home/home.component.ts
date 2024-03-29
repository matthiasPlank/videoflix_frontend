import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { VideouploadComponent } from "./videoupload/videoupload.component";
import { VideoService } from '../services/video.service';
import { Video } from '../models/video.class';
import { NgFor, NgIf } from '@angular/common';
import { CategoryComponent } from "./category/category.component";
import { ElementSchemaRegistry } from '@angular/compiler';
import { TopMovieComponent } from "./top-movie/top-movie.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, VideouploadComponent, NgIf, NgFor, CategoryComponent, TopMovieComponent]
})
export class HomeComponent {

    topVideos: Video[] = [];
    topVideosCounter = 3; 
    videos: Video[] = [];
    categories: string[] = []; 

    /**
     * Gets all videos from backend
     * @param videoService 
     */
    constructor(private videoService: VideoService) {
        this.fetchVideos();
    }

    /**
     * Gets all videos from backend
     */
    async fetchVideos() {
        try {
            this.videos = await this.videoService.getAllVideos();
            this.setCatgories();
            this.setTopVideos();  
        } catch (error) {
            console.error("An error occurred while fetching videos:", error);
        }
    }

    /**
     * Get categories from videos to render category components
     */
    setCatgories(){
        this.videos.forEach(video => {
            if(!this.categories.includes(video.genre)){
                this.categories.push(video.genre); 
            }
        });
    }

    /**
     * Get filtered videos from loaded videos
     * @param genre - genre as string
     * @returns video array with filtered videos
     */
    getFilteredVideos(genre:string){
        const filteredVideos = this.videos.filter((video) => video.genre == genre);
        return filteredVideos
    }


    setTopVideos(){
        if(this.videos.length > 0){
            let counter = 0; 
            this.videos.forEach(video => {
                if(counter < this.topVideosCounter){
                    this.topVideos.push(video); 
                    counter++; 
                }
            });
            console.log("Videos in HOME:")
            console.log(this.topVideos)
            this.topVideos = this.topVideos; 
        }
    }
}
