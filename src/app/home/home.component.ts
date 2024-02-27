import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { VideouploadComponent } from "./videoupload/videoupload.component";
import { VideoService } from '../services/video.service';
import { Video } from '../models/video.class';
import { NgFor, NgIf } from '@angular/common';
import { CategoryComponent } from "./category/category.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, VideouploadComponent, NgIf, NgFor, CategoryComponent]
})
export class HomeComponent {

    videos: Video[] = [];
    categories: string[] = []; 

    constructor(private videoService: VideoService) {
        this.fetchVideos();
    }

    async fetchVideos() {
        try {
            this.videos = await this.videoService.getAllVideos();
            console.log(this.videos);
            this.setCatgories(); 
        } catch (error) {
            console.error("An error occurred while fetching videos:", error);
        }
    }

    setCatgories(){
        this.videos.forEach(video => {
            if(!this.categories.includes(video.genre)){
                this.categories.push(video.genre); 
            }
        });
        console.log(this.categories);
        
    }

    getFilteredVideos(genre:string){
        const filteredVideos = this.videos.filter((video) => video.genre == genre);
        return filteredVideos
    }

    
}
