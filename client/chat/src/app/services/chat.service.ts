import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.backendUrl}/users`;
  private socket: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  connect(username: string, callback: any) {
    this.socket = io(environment.chatUrl, { path: environment.chatPath });
  }

  isConnected() {
    if (this.socket != null) {
      return true;
    } else {
      return false;
    }
  }

  getUserList() {
    let observableReq = this.http.get(this.apiUrl);

    return observableReq;
  }

  receiveActiveList(): any {
    let observable = new Observable((observer) => {
      this.socket.on('active', (data: any) => {
        console.log('socket active: ', data);
        observer.next(data);
      });
    });

    return observable;
  }

  getActiveList(): void {
    this.socket.emit('getactive');
  }
}
