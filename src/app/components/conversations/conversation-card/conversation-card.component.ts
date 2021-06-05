import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";

@Component({
  selector: 'app-conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.css']
})
export class ConversationCardComponent implements OnInit {
 @Input()
 conversation: Conversation;

  constructor(private conversationBoxService:ConversationBoxService) { }

  ngOnInit(): void {
  }

  onConversationSelect(){
    this.conversationBoxService.selectConversation(this.conversation);
  }
}
