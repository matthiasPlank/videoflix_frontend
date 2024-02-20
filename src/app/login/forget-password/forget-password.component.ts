import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  constructor(
    private authService:AuthService, 
    private router:Router
    ){}

  resetPassword(){
    const email = this.resetPasswordForm.get("email")?.value; 
    
    if(email != null){
      this.authService.resetPassword( email )
      .subscribe( (response: any)  => {
          console.log("Sucessfull: send email ");
          console.log(response.token); 
          //this.router.navigate(['/home']);
      } ,  
          err => {
            console.log('HTTP Error', err); 
          }
      )
    }

  }

}
