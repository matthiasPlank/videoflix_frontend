import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Token } from '@angular/compiler';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,  MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule , NgIf , NgFor , MatProgressSpinnerModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {


  resetPasswordForm = new FormGroup({
    password: new FormControl('' , [Validators.required, Validators.minLength(8)] ),
    confirmPassword: new FormControl('' , [Validators.required, Validators.minLength(8)] ),
  });

  hideResetPW = true; 
  hideResetConfirmPW = true; 
  token = ""; 
  restPasswordFailed = false; 
  errorMessage:string[] = []; 
  showSpinner = false; 

  constructor(private route: ActivatedRoute , private router:Router,  private authService:AuthService){ 
  }

  /**
   * Get token from url param. 
   */
  ngOnInit(){
    this.token = this.route.snapshot.params["token"];
  }

  /**
   * Checks new passwords and sends to servive for verification 
   */
  resetPassword(){
    const password = this.resetPasswordForm.get("password")?.value; 
    const password2= this.resetPasswordForm.get("confirmPassword")?.value; 

    if(password != null && password == password2 && this.token != ""){
      this.authService.changePassword(password, this.token)
      .subscribe({
        next: (response:any) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('HTTP Error', err); 
          this.printErrorMessage(err); 
        }
      })
    }
    else{
      this.restPasswordFailed = true; 
      this.errorMessage.push("Passwords are not the same");
    }
  }
  
   /**
   * Checks errors from HTTP Error and prints to register form. 
   * @param err - HTTP Error
   */
   printErrorMessage(err: any) {
    const pwError = err.error.password
    const userError = err.error.username
    this.errorMessage = []; 

    if (pwError != null) {
      pwError.forEach((errorMessage: any) => {
        console.error(errorMessage);
        this.errorMessage.push(errorMessage);
      });
    }
    if (userError != null) {
      userError.forEach((errorMessage: any) => {
        console.error(errorMessage);
        this.errorMessage.push(errorMessage);
      });
    }
    if(this.errorMessage.length == 0){
      this.errorMessage.push("Reset password failed");
    }
    this.showSpinner = false;
    this.restPasswordFailed = true
  }
}
