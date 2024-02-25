import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { MatDialog , MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import { VideouploadComponent } from '../videoupload/videoupload.component';
import {MatDialogModule} from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule , MatButtonModule, MatMenuModule , MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  
  constructor(private router:Router, public modalService: ModalService , public dialog: MatDialog){

  }

  openModal() {
    // Trigger the openModal method from the service
    this.modalService.openModal();
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  openDialog() {
    //this.modalService.openModal();
    this.dialog.open(VideouploadComponent);
  }
}
