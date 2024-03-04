import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule , NgIf , MatProgressSpinnerModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  sendForgetPasswordEmailFailed = false; 
  errorMessage = ""; 
  sendMailSuccessfully = false; 
  showSpinner = false; 


  @Output() showLogin = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Gets email from form and send to service for sending a email. 
   */
  resetPassword() {
    const email = this.resetPasswordForm.get("email")?.value;
    this.showSpinner = true; 

    if (email != null) {
      this.authService.resetPassword(email)
      .subscribe({
        next: (response:any) => {
          this.showSpinner = false; 
          this.sendMailSuccessfully = true; 
        },
        error: (err) => {
          this.showSpinner = false; 
          this.sendForgetPasswordEmailFailed = true; 
          if(err.error.email[0]){
            this.errorMessage = err.error.email[0]; 
          }
        },
        complete: () => console.info('complete') 
      })
    }
  }

  /**
   * Emits trigger to parent for switching to login screen. 
   */
  backToLogin() {
    this.showLogin.emit("");
  }
}
