import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-active-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './active-list.component.html',
  styleUrl: './active-list.component.scss',
})
export class ActiveListComponent implements OnInit {
  @Input() users!: any;
  @Input() current!: string;
  @Output() newConversation = new EventEmitter();

  ngOnInit(): void {
    console.log(this.users);
  }

  onUserClick(username: string) {
    this.newConversation.emit(username);
    this.current = username;
  }
}
