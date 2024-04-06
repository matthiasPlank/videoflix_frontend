import { Component, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { MatDialog , MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import { VideouploadComponent } from '../videoupload/videoupload.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule , MatButtonModule, MatMenuModule , MatDialogModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router:Router, 
    public modalService: ModalService , 
    public dialog: MatDialog, 
    public authService: AuthService){
  }

  /**
   * Trigger the openModal method from the service
   */
  openModal() {
    this.modalService.openModal();
  }

  /**
   * Logout user by deleting auth token. 
   */
  logout(){
    this.authService.clearLocalStroage(); 
    this.router.navigateByUrl("/login");
  }

  /**
   * open Videoupload Dialog. 
   */
  openDialog() {
    this.dialog.open(VideouploadComponent);
  }
}
