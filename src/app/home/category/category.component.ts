import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Video } from '../../models/video.class';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';


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
  isScrollbarAtEnd = false; 
  @ViewChild('categoryVideoDiv') categoryVideoDiv!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {
 

  }
  
  ngAfterViewInit(){
    this.onScroll()
  }

  openVideo(id: string) {
    console.log("open video with id:" + id);
    this.router.navigate(['/video', id]);
  }

  moveScrollbar(direction: string){
    const divElement = this.categoryVideoDiv.nativeElement;
    direction == "left" ? divElement.scrollTo(this.currentScrollPos-this.scrollWidth, 0) : divElement.scrollTo(this.currentScrollPos+this.scrollWidth, 0);
    this.onScroll()
  }

  onScroll() {
    const divElement = this.categoryVideoDiv.nativeElement;
    this.currentScrollPos = divElement.scrollLeft ; 
    //console.log("scrollWidth:" + divElement.scrollWidth);
    //console.log("scrollleft:" + divElement.scrollLeft);
    //console.log("clienWidth" + divElement.offsetWidth);
    
    this.isScrollbarAtEnd = ( divElement.scrollWidth - divElement.scrollLeft === divElement.clientWidth ) || ( divElement.scrollWidth == divElement.clientWidth);
    //console.log(this.isScrollbarAtEnd );
    
  }

  /*
  @HostListener('mousewheel', ['$event']) // for window scroll events
  onScroll(event:WheelEvent) {
    console.log(event); 
    const divElement = this.categoryVideoDiv.nativeElement;
    if (divElement &&  ( event.timeStamp - this.lastScrol > 10)){
      this.lastScrol = event.timeStamp; 
      if (event.deltaY !== 0) {
        if (event.deltaY > 0) {
            // Scrolling to the right
            divElement.scrollLeft += this.scrollSpeed; // Scroll down by 5 pixels
        } else {
            // Scrolling to the left
            divElement.scrollLeft -= this.scrollSpeed;; // Scroll down by 5 pixels
        }
      }
      
    }
  }
  */ 

}


