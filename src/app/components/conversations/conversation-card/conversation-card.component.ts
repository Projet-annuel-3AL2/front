import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation.model";

@Component({
  selector: 'app-conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.css']
})
export class ConversationCardComponent implements OnInit {
 @Input()
 conversation: Conversation;

  constructor() { }

  ngOnInit(): void {
  }

}
