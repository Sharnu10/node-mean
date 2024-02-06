import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = environment.backendUrl;
  apiUrl = `${this.BASE_URL}/users`;
  authToken!: string | null;
  user!: string | null;

  constructor(private http: HttpClient) {}

  loggedIn() {
    return true;
  }

  login(User: any) {
    let urls = this.apiUrl + '/authenticate';
    let observableReq = this.http.post<ApiResponse>(urls, JSON.stringify(User));
    return (
      observableReq || of({ success: true, message: 'message', title: 'Title' })
    );
  }

  /**
   * @param User
   * @returns
   */
  registerUser(User: any) {
    console.log('User ', User);
    let url = this.apiUrl + '/register';
    let observableReq = this.http.post(url, User);
    return (
      observableReq || of({ success: true, message: 'message', title: 'Title' })
    );
  }

  storeUserData(token: string, user: any): void {
    localStorage.setItem('token', token ?? '');
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get user data
   * @returns user
   */
  getUserData() {
    this.authToken = localStorage.getItem('token');
    this.user = localStorage.getItem('user');
    let userData = { token: this.authToken, user: this.user };
    return userData;
  }
}
