import { Component, Input } from '@angular/core';
import { Video } from '../../models/video.class';
import { NgFor, NgIf } from '@angular/common';

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
    

}
