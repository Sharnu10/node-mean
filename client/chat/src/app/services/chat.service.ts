import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.backendUrl}/users`;
  private socket: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  connect(username: string, callback: any) {
    this.socket = io(environment.chatUrl);
    // this.socket = io(environment.chatUrl, { path: environment.chatPath });
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

  isConnected() {
    if (this.socket != null) {
      return true;
    } else {
      return false;
    }
  }

  sendMessage(message: Message, chatWith: string) {
    this.socket.emit('message', 'message');
    // this.socket.emit('message', { message: message, to: chatWith });
    // this.socket.on('welcome', (msg: any) => {
    //   console.log('socket welcome: ', msg);
    // });
  }
}
