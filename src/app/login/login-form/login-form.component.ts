import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule , NgIf , MatProgressSpinnerModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(8)] ),
  });
  hideLoginPW = true;
  hideRegisterPW = true;
  hideRegisterConfirmPW = true;
  loginFailed = false; 
  loginFailedMessage = ""
  showConfirmationEmailHint = false; 
  showSpinner = false; 
  showRegister = false; 
  loginSpinner = false; 

  @Output() showReg = new EventEmitter<string>();
  @Output() showPWReset = new EventEmitter<string>();


  constructor(
    private authService:AuthService, 
    private router:Router
    ){}

  login(){
    const username = this.LoginForm.get("email")?.value; 
    const password = this.LoginForm.get("password")?.value; 
    this.loginSpinner = true; 

    if(username != null && password != null){
      this.authService.getToken( username , password )
      .subscribe({
        next: (response:any) => {
          this.authService.setLocalStorageItems(response.token, response.email); 
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loginSpinner = false; 
          console.error('HTTP Error', err); 
          if(err.status == 401){
            this.loginFailedMessage = err.error ; 
          }
          else{
            this.loginFailedMessage ="Please check username and password"; 
          }
          this.loginFailed = true
        }, 
        complete: () =>  {
            this.loginSpinner = false; 
        } 
      })
    }
  }

  showRegisterForm(){
    this.showReg.emit("");
  }

  showPasswordReset(){
    this.showPWReset.emit(""); 
  }

  goToPrivacyPolicy(){
    this.router.navigate(['/privacy-policy', {}]);
  }
  goToImprint(){
    this.router.navigate(['/imprint', {}]);
  }

}
