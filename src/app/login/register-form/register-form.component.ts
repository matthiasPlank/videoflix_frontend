import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, NgIf, NgFor, MatProgressSpinnerModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  RegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  @Output() showLogin = new EventEmitter<string>();

  hideLoginPW = true;
  hideRegisterPW = true;
  hideRegisterConfirmPW = true;
  loginFailed = false;
  loginFailedMessage: string[] = [];
  showConfirmationEmailHint = false;
  showSpinner = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Gets userinput from register form and sends to service for register in backend. 
   */
  register() {
    const email = this.RegisterForm.get("email")?.value;
    const password = this.RegisterForm.get("password")?.value;
    const confirmPassword = this.RegisterForm.get("confirmPassword")?.value;

    if (email != null && password != null && password == confirmPassword) {
      this.showSpinner = true;
      this.authService.register(email, password, confirmPassword, email)
        .subscribe({
          next: (response: any) => {
            this.successfullyRegistered(response);
          },
          error: (err) => {
            this.loginFailedMessage = [];
            console.log('HTTP Error', err);
            this.printErrorMessage(err);
          },
          complete: () => console.info('complete')
        })
    }
    else{
      debugger
      if(password != confirmPassword){
        this.loginFailedMessage = [];
        this.loginFailedMessage.push("Passwords are not equal");
        this.loginFailed = true
      }
    }
  }

  /**
   * Sets token for authentication and redirects to homescreen after successfull registration.
   * @param response - response from auth service
   */
  successfullyRegistered(response: any) {
    this.showSpinner = false;
    this.authService.setLocalStorageItems(response.token, response.email); 
    this.showConfirmationEmailHint = true;
    setTimeout(() => {
      this.showConfirmationEmailHint = false;
      this.router.navigate(['/login']);
      this.showLogin.emit("");
    }, 3000);
  }

  /**
   * Emits button trigger to go back to login form. 
   */
  backToLogin() {
    this.showLogin.emit("");
  }

  /**
   * Checks errors from HTTP Error and prints to register form. 
   * @param err - HTTP Error
   */
  printErrorMessage(err: any) {
    const pwError = err.error.password; 
    const userError = err.error.username; 
    const emailError = err.error.email; 

    if (pwError != null) {
      pwError.forEach((errorMessage: any) => {
        console.log(errorMessage);
        this.loginFailedMessage.push(errorMessage);
      });
    }
    if (userError != null) {
      userError.forEach((errorMessage: any) => {
        console.log(errorMessage);
        this.loginFailedMessage.push(errorMessage);
      });
    }
    if (emailError != null) {
      emailError.forEach((errorMessage: any) => {
        console.log(errorMessage);
        this.loginFailedMessage.push(errorMessage);
      });
    }
    this.showSpinner = false;
    this.loginFailed = true
  }
}
