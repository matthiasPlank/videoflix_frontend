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
    console.log("getToken");
      return this.httpClient.request('POST' , this.backendURL + "/api-token-auth/" , {
        body: '{"email": "'+ email+ '", "password": "' + password + '"}',
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
      } )  
  }

}
