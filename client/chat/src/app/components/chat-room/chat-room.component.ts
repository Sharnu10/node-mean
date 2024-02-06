import { Component, OnInit } from '@angular/core';

import { ActiveListComponent } from '../active-list/active-list.component';
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';

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
  userList!: [];

  constructor(private chatSer: ChatService) {}

  ngOnInit(): void {
    this.showActive = true;
    this.chatWith = 'chat-room';
    this.noMsg = true;

    this.getUserList();
  }

  getUserList() {
    this.chatSer.getUserList().subscribe({
      next: (response: any) => {
        this.userList = response.users;
      },
    });
  }

  onNewConversation(username: string) {}
}
