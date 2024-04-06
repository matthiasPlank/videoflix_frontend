import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise((resolve, reject) => {
    authService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        resolve(true); // User is logged in, allow route activation
      } else {
        localStorage.clear(); 
        resolve(router.createUrlTree(['']));
      }
    }).catch(error => {
      console.error("Error checking login status", error);
      resolve(false);
    });
  });
};
