import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule , NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(4)] ),
  });
  hide = true;
  loginFailed = false; 

  RegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required , Validators.minLength(4)]),
  });
  showRegister = false; 

  constructor(
      private authService:AuthService, 
      private router:Router
      ){}

  
  login(){
    const username = this.LoginForm.get("email")?.value; 
    const password = this.LoginForm.get("password")?.value; 

    console.log(username);
    if(username != null && password != null){
      this.authService.getToken( username , password )
      .subscribe(response => {
          console.log("Sucessfull:");
          console.log(response); 
          /* SAVE TOKEN  */
          this.router.navigate(['/home']);
      } ,  
          err => {
            console.log('HTTP Error', err); 
            this.loginFailed = true
          }
      );
    }
  }

  register(){
    console.log("");
  }
}
