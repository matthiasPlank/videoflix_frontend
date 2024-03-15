import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";



@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, NgIf, MatProgressSpinnerModule, LoginFormComponent, RegisterFormComponent, ForgetPasswordComponent]
})
export class LoginComponent {

  showRegister = false; 
  passwordReset = false; 

  constructor(
      private authService:AuthService, 
      private router:Router
      ){}

  ngOnInit(){
    this.checkAutologin(); 
  }    

  /**
   * switch view to register
   */
  showReg(){
    this.showRegister = true; 
    this.passwordReset = false; 
  }

  /**
   * switch view to password reset
   */
  showPWReset(){
    this.showRegister = false; 
    this.passwordReset = true; 
  }

  /**
   * switch view to login
   */
  showLogin(){
    this.showRegister = false; 
    this.passwordReset = false; 
  }


  /**
  * Checks if localstorage token is valid and redirects ti home page if user is logged in. 
  */
  checkAutologin(){
    this.authService.checkAutoLogin()
      .subscribe({
        next: (response:any) => {
          if (response.valid) {
            this.router.navigateByUrl("home"); 
          }
        },
        error: (e) => {
          if(!(e.message == "No Data in localstorage")) {
            console.error(e)
          }
        }
    })
  }
}
