import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './home/video/video.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'password_reset/:token', component: ResetPasswordComponent },
    { path: 'home', component: HomeComponent },
    { path: 'video/:id', component: VideoComponent },
];
