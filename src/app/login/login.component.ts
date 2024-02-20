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

  showReg(){
    this.showRegister = true; 
    this.passwordReset = false; 
  }

  showPWReset(){
    this.showRegister = false; 
    this.passwordReset = true; 
  }


  
}
