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

  registerUser(User: any) {
    console.log('User ', User);
    let url = this.apiUrl + '/register';

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/x-www-form-urlencoded',
    //     'Content-Type': 'application/json',
    //   }),
    // };

    // let observableReq = this.http.post(url, User, httpOptions);

    let observableReq = this.http.post(url, User);

    return (
      observableReq || of({ success: true, message: 'message', title: 'Title' })
    );
  }
}
