import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  backendURL: string = environment.apiUrl;
  isSuperuser = false; 

  constructor(private httpClient: HttpClient) {

  }

  /**
   * Sends login credential to backend and receives token
   * @param email 
   * @param password 
   * @returns 
   */
  getToken(email: string, password: string) {
    localStorage.removeItem("token");
    return this.httpClient.request('POST', this.backendURL + "/api-token-auth/", {
      body: '{"email": "' + email + '", "password": "' + password + '"}',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  /**
   * Sends register data to backend 
   * @param email 
   * @param password 
   * @param confirmPassword 
   * @param user 
   * @returns 
   */
  register(email: string, password: string, confirmPassword: string, user: string) {
    localStorage.removeItem("token");
    return this.httpClient.request('POST', this.backendURL + "/register/", {
      body: JSON.stringify({
        username: user,
        email: email,
        password: password,
        password2: confirmPassword
      }),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  /**
  * Sends email to backend to send email with verificationtoken per mail.
  * @param email - email adress of user
  * @returns - JSON Request
  */
  resetPassword(email: string) {
    return this.httpClient.request('POST', this.backendURL + "/password_reset/", {
      body: JSON.stringify({
        email: email
      }),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  /**
   * Sends new Password and Token to backend.
   * @param password - new password 
   * @param token - verification token
   * @returns - JSON Response
   */
  changePassword(password: string, token: string) {
    return this.httpClient.request('POST', this.backendURL + "/password_reset/confirm/", {
      body: JSON.stringify({
        password: password,
        token: token
      }),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  /**
   * Returns whether the user is logged in or not with provided informations in localstorage.
   * @returns {boolean}
   */
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      this.checkAutoLogin().subscribe({
        next: (v: any) => {
          if (v.valid) {
            v.isSuperuser ? this.isSuperuser = true : this.isSuperuser = false;  
            resolve(true);
          }
          resolve(false);
        },
        error: (e) => resolve(false),
      });
    });
  }

  /**
   * Get auth-token from localstorage
   * @returns token 
   */
  getAuthorizationToken() {
    return localStorage.getItem("token");
  }

  /**
   * Removes token and email from localstorage
   */
  clearLocalStroage() {
    localStorage.clear();
  }

  /**
   * Sets the given parameter in localstorage
   * @param token - token
   * @param email - email 
   */
  setLocalStorageItems(token: string, email: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  }

  /**
   * Checks if localstorage token is valid. 
   * @returns Observable
   */
  checkAutoLogin() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token != "" && token != null && token != "undefined" && email != "" && email != null && email != "undefined") {
      return this.httpClient.request('POST', this.backendURL + "/checkToken/", {
        body: JSON.stringify({
          email: email,
          token: token
        }),
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
    }
    else {
      this.clearLocalStroage();
      return throwError(() => new Error("No Data in localstorage"));
    }
  }
}
