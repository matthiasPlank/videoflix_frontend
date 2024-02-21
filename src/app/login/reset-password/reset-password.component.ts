import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute ){
    
  }

  ngOnInit(){
    const token = this.route.snapshot.params["token"];
    console.log(token);
     
  }


  resetPassword(){

  }

}
