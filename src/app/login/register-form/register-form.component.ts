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


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule , NgIf , MatProgressSpinnerModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  RegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required , Validators.minLength(4)]),
  });
  showRegister = false; 

  hideLoginPW = true;
  hideRegisterPW = true;
  hideRegisterConfirmPW = true;
  loginFailed = false; 
  showConfirmationEmailHint = false; 
  showSpinner = false; 

  constructor(
    private authService:AuthService, 
    private router:Router
    ){}

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

  
  backToLogin(){

  }



}
