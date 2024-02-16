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



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule , NgIf , MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(4)] ),
  });
  hideLoginPW = true;
  hideRegisterPW = true;
  hideRegisterConfirmPW = true;
  loginFailed = false; 
  showConfirmationEmailHint = false; 
  showSpinner = false; 

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
      .subscribe( (response: any)  => {
          console.log("Sucessfull:");
          console.log(response.token); 
          localStorage.setItem("token" , response.token)
          this.router.navigate(['/home']);
      } ,  
          err => {
            console.log('HTTP Error', err); 
            this.loginFailed = true
          }
      )
    }
  }

  register(){
    const email = this.RegisterForm.get("email")?.value; 
    const password = this.RegisterForm.get("password")?.value; 
    const confirmPassword = this.RegisterForm.get("confirmPassword")?.value; 
    if( email != null && password != null && password == confirmPassword){
        this.showSpinner = true; 
        this.authService.register(email, password , confirmPassword , email)
        .subscribe((response: any)  => {
          console.log("Sucessfull:");
          console.log(response.token); 
          this.showSpinner = false; 
          localStorage.setItem("token" , response.token); 
          this.showConfirmationEmailHint = true; 
          setTimeout(()=>{                   
            this.showConfirmationEmailHint = false; 
            this.router.navigate(['/login']);
          }, 3000);
      }); 
    }
  }
}
