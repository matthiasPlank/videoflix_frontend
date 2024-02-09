import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.class';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Input() categoryName: string = ""; 
  @Input() categoryVideos: Video[] = []; 
    

  constructor(private router:Router){

  }

  openVideo(id:string){
    console.log("open video with id:" + id);
    this.router.navigate(['/video', id]);
  }

}
