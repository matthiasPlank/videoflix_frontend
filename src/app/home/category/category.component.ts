import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import { style } from '@angular/animations';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgIf, NgFor, MatIconModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Input() categoryName: string = "";
  @Input() categoryVideos: Video[] = [];

  lastScrol:number = 0; 
  scrollSpeed = 90; 
  currentScrollPos:number = 0; 
  scrollWidth:number = 800; 
  isScrollbarAtEnd = true; 
  @ViewChild('categoryVideoDiv') categoryVideoDiv!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {
  }
  
  /**
   * Init scroll button
   */
  ngAfterViewInit(){
    setTimeout(() => {
      this.onScroll(); // Modify component property after view initialization
    }, 1000 );
  }

  /**
   * Open Video with given id
   * @param id 
   */
  openVideo(id: string) {
    this.router.navigate(['/video', id]);
  }

  /**
   * Scrolls category to givern direction by defined width
   * @param direction - scroll direction
   */
  moveScrollbar(direction: string){
    const divElement = this.categoryVideoDiv.nativeElement;
    direction == "left" ? divElement.scrollTo(this.currentScrollPos-this.scrollWidth, 0) : divElement.scrollTo(this.currentScrollPos+this.scrollWidth, 0);
    this.onScroll()
  }

  /**
   * Sets current scroll position and checks if scrollbar is at end. 
   */
  onScroll() {
    const divElement = this.categoryVideoDiv.nativeElement;
    this.currentScrollPos = divElement.scrollLeft ; 
    this.isScrollbarAtEnd = ( divElement.scrollWidth - divElement.scrollLeft === divElement.clientWidth ) || ( divElement.scrollWidth == divElement.clientWidth);
  }

}


