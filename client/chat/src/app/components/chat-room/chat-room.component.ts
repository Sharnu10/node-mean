import { Component, ElementRef, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { ActiveListComponent } from '../active-list/active-list.component';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesComponent } from '../flash-messages/flash-messages.component';
import { Message } from '../../model/message.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    ActiveListComponent,
    FlashMessagesComponent,
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit {
  chatWith!: string;
  currentOnline!: boolean;
  messageList: Message[] = [];
  noMsg!: boolean;
  receiveActiveObs: any;
  showActive!: boolean;
  userList!: any[];
  username!: string;
  sendForm!: FormGroup;
  conversationId!: string;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    let userData = this.authService.getUserData();
    this.username = userData.user.username;

    this.showActive = true;
    this.chatWith = 'chat-room';
    this.noMsg = true;

    this.sendForm = this.fb.group({
      message: ['', Validators.required],
    });

    this.connectToChat();
  }

  connectToChat(): void {
    if (this.chatService.isConnected()) {
      this.initReceivers();
    } else {
      this.chatService.connect(this.username, () => {
        this.initReceivers();
      });
    }
  }

  initReceivers() {
    this.getUserList();
  }

  getUserList() {
    this.chatService.getUserList().subscribe((data: any) => {
      if (data.success == true) {
        let users = data.users;
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.username) {
            users.splice(i, 1);
            break;
          }
        }
        this.userList = users.sort(this.compareByUsername);

        this.receiveActiveObs = this.chatService
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

        this.chatService.getActiveList();
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
    this.getMessages();
    this.currentOnline = this.checkOnline(username);
    this.showActive = false;
  }

  getMessages() {}

  onSendMessage(): void {
    let newMessage: Message = {
      created: new Date(),
      from: this.username,
      text: this.sendForm.value.message,
      conversationId: this.conversationId,
      inChatRoom: this.chatWith == 'chat-room',
    };
    newMessage.mine = true;
    this.chatService.sendMessage(newMessage, this.chatWith);
    this.noMsg = false;
    this.messageList.push(newMessage);
    this.scrollToBottom();
    this.sendForm.setValue({ message: '' });
  }

  checkMine(message: Message): void {
    message.from === this.username
      ? (message.mine = true)
      : (message.mine = false);
  }

  scrollToBottom(): void {
    let element = this.elementRef.nativeElement.querySelector('msg-container');
    setTimeout(() => {
      element.scrolTop = element.scrollHeight;
    }, 100);
  }

  compareByUsername(a: any, b: any): number {
    if (a.username < b.username) return -1;
    if (a.username > b.username) return 1;
    return 0;
  }
}
