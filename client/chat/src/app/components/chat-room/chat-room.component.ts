import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { ActiveListComponent } from '../active-list/active-list.component';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ActiveListComponent, NgClass],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit {
  chatWith!: string;
  showActive!: boolean;
  noMsg!: boolean;
  userList!: any[];
  username!: string;
  receiveActiveObs: any;
  currentOnline!: boolean;

  constructor(
    private chatSer: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let userData = this.authService.getUserData();
    this.username = userData.user.username;

    this.showActive = true;
    this.chatWith = 'chat-room';
    this.noMsg = true;

    this.connectToChat();
  }

  connectToChat(): void {
    if (this.chatSer.isConnected()) {
      this.initReceivers();
    } else {
      this.chatSer.connect(this.username, () => {
        this.initReceivers();
      });
    }
  }

  initReceivers() {
    this.getUserList();
  }

  getUserList() {
    this.chatSer.getUserList().subscribe((data: any) => {
      if (data.success == true) {
        let users = data.users;
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.username) {
            users.splice(i, 1);
            break;
          }
        }
        this.userList = users.sort(this.compareByUsername);

        this.receiveActiveObs = this.chatSer
          .receiveActiveList()
          .subscribe((users: any) => {
            for (let onlineUser of users) {
              if (onlineUser.username != this.username) {
                let flaggy = 0;
                for (let registered of this.userList) {
                  if (registered.username === onlineUser.username) {
                    flaggy = 1;
                    break;
                  }
                }
                if (flaggy == 0) {
                  this.userList.push(onlineUser);
                  this.userList.sort(this.compareByUsername);
                }
              }
            }

            for (let user of this.userList) {
              let flag = 0;
              for (let liveUser of users) {
                if (liveUser.username == user.username) {
                  user.online = true;
                  flag = 1;
                  break;
                }
              }
              if (flag == 0) {
                user.online = false;
              }
            }

            this.currentOnline = this.checkOnline(this.chatWith);
          });

        this.chatSer.getActiveList();
      } else {
        this.onNewConversation('chat-room');
      }
    });
  }

  checkOnline(name: string) {
    if (name == 'chat-room') {
      for (let user of this.userList) {
        if (user.online) return true;
        return false;
      }
    } else {
      for (let user of this.userList) {
        if (user.username == name) {
          return user.online;
        }
      }
    }
  }

  onNewConversation(username: string) {
    // if (this.chatWith != username) {
    //   this.router.navigate(['/chat', username]);
    // }
    this.getMessages(username);
    this.currentOnline = this.checkOnline(username);
    this.showActive = false;
  }

  getMessages(username: string) {}

  compareByUsername(a: any, b: any): number {
    if (a.username < b.username) return -1;
    if (a.username > b.username) return 1;
    return 0;
  }
}
