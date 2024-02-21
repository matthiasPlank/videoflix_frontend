import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,  MatFormFieldModule, MatInputModule, FormsModule, MatIconModule , MatButtonModule ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {


  resetPasswordForm = new FormGroup({
    password: new FormControl('' , [Validators.required, Validators.minLength(4)] ),
    confirmPassword: new FormControl('' , [Validators.required, Validators.minLength(4)] ),
  });

  hideResetPW = true; 
  hideResetConfirmPW = true; 
  token = ""; 

  constructor(private route: ActivatedRoute , private router:Router,  private authService:AuthService){
    
  }

  ngOnInit(){
    this.token = this.route.snapshot.params["token"];
    console.log(this.token);
     
  }


  resetPassword(){
    debugger
    const password = this.resetPasswordForm.get("password")?.value; 
    const password2= this.resetPasswordForm.get("confirmPassword")?.value; 

    if(password != null && password == password2 && this.token != ""){
      this.authService.changePassword(password, this.token)
        .subscribe( (response: any)  => {
          console.log("Sucessfull: change password");
          this.router.navigate(['/home']);
      } ,  
          err => {
            console.log('HTTP Error', err); 
          }
      )
    }
  }

}
