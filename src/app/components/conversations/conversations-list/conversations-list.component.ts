import {Component, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {ConversationService} from "../../../services/conversation/conversation.service";

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  conversations: Conversation[];

  constructor(public conversationBoxService: ConversationBoxService, private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.conversationService.getConversations()
      .subscribe(conversations=>this.conversations=conversations);
  }
}
