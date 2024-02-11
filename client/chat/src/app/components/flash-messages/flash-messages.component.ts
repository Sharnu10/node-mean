import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import moment from 'moment';

import { Message } from '../../model/message.model';

@Component({
  selector: 'flash-messages',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flash-messages.component.html',
  styleUrl: './flash-messages.component.scss',
})
export class FlashMessagesComponent implements OnInit {
  @Input() message!: Message;
  time: any;
  fadeTime!: boolean;

  ngOnInit(): void {
    this.message?.mine
      ? (this.message.mine = true)
      : (this.message['mine'] = false);
    setTimeout(() => {
      this.updateFromNow();
      this.fadeTime = true;
    }, 2000);
    setTimeout(() => {
      this.updateFromNow();
    }, 60000);
  }

  updateFromNow(): void {
    this.time = moment(this.message.created).fromNow();
  }
}
