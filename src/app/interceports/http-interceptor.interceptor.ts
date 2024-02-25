import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const authToken = authService.getAuthorizationToken();

  console.log("INTERCEPTOR")

  if(authToken != null){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Token ' + authToken)
    });
    return next(authReq);
  }
  else{
    return next(req);
  }

};
