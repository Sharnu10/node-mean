import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiUrl = `${environment.backendUrl}/users`;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getUserList() {
    let observableReq = this.http.get(this.apiUrl);

    return observableReq;
  }
}
