import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './home/video/video.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { authGuard } from './guard/auth-guard.service';
import { PrivacyPolicyComponent } from './login/privacy-policy/privacy-policy.component';
import { ImprintComponent } from './login/imprint/imprint.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'login', component: LoginComponent },
    { path: 'password_reset/:token', component: ResetPasswordComponent },
    { path: 'home', component: HomeComponent , canActivate: [authGuard] },
    { path: 'video/:id', component: VideoComponent , canActivate: [authGuard] },
];
