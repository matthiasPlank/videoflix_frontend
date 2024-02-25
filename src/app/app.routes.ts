import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './home/video/video.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { authGuard } from './guard/auth-guard.service';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'password_reset/:token', component: ResetPasswordComponent },
    { path: 'home', component: HomeComponent , canActivate: [authGuard] },
    { path: 'video/:id', component: VideoComponent , canActivate: [authGuard] },
];
