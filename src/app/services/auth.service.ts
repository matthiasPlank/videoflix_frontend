import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendURL:string = 'http://127.0.0.1:8000'; 

  constructor(private httpClient: HttpClient) { }



  getToken(email:string, password:string){
      return this.httpClient.request('POST' , this.backendURL + "/api-token-auth/" , {
        body: '{"email": "'+ email+ '", "password": "' + password + '"}',
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
      } )  
  }

  register(email:string, password:string , confirmPassword: string , user:string){
    console.log("SEND REGISTER REQUEST");
    
    return this.httpClient.request('POST' , this.backendURL + "/register/" , {
      body: JSON.stringify({
        username: user,
        email: email,
        password: password,
        password2: confirmPassword
      }),
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    } )  
    
  }

}
