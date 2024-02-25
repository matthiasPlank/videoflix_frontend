import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root', 
})
export class AuthService {

  backendURL:string = 'http://127.0.0.1:8000'; 

  constructor(private httpClient: HttpClient) { }

  /**
   * Sends login credential to backend and receives token
   * @param email 
   * @param password 
   * @returns 
   */
  getToken(email:string, password:string){
      return this.httpClient.request('POST' , this.backendURL + "/api-token-auth/" , {
        body: '{"email": "'+ email+ '", "password": "' + password + '"}',
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
      } )  
  }

  /**
   * Sends register data to backend 
   * @param email 
   * @param password 
   * @param confirmPassword 
   * @param user 
   * @returns 
   */
  register(email:string, password:string , confirmPassword: string , user:string){    
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

  /**
  * Sends email to backend to send email with verificationtoken per mail.
  * @param email - email adress of user
  * @returns - JSON Request
  */
  resetPassword(email:string){
    return this.httpClient.request('POST' , this.backendURL + "/password_reset/" , {
      body: JSON.stringify({
        email: email
      }),
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    } )  
  }

  /**
   * Sends new Password and Token to backend.
   * @param password - new password 
   * @param token - verification token
   * @returns - JSON Response
   */
  changePassword(password:string , token:string){
    return this.httpClient.request('POST' , this.backendURL + "/password_reset/confirm/" , {
      body: JSON.stringify({
        password: password,
        token : token
      }),
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    } )  
  }

  /**
   * Returns whether the user is logged in or not 
   * 
   * @returns {boolean}
   */
    isLoggedIn(): boolean {
      const token = localStorage.getItem('token')
      return token !== null && token != "" ? true : false;
    }

    getAuthorizationToken(){
      return localStorage.getItem("token"); 
    }



}
