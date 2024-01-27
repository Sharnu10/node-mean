import { Component } from '@angular/core';

import { ActiveListComponent } from '../active-list/active-list.component';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ActiveListComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {}
