import {Component, Input, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {User} from "../../../shared/models/user.model";
import {ConversationService} from "../../../services/conversation/conversation.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @Input()
  conversation: Conversation;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  user: User;

  constructor(private authService: AuthService, public conversationBoxService: ConversationBoxService, private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.conversationService.getMessages(this.conversation.id)
      .subscribe(messages=>this.conversation.messages = messages);
  }

  getConversationName(): string {
    if (this.conversation.group !== undefined) {
      return this.conversation.group.name;
    } else if (this.conversation.organisation !== undefined) {
      return this.conversation.organisation.name;
    } else {
      return this.conversation.friendship.friendOne.id !== this.authService.getCurrentUserId() ? this.conversation.friendship.friendOne.username : this.conversation.friendship.friendTwo.username;
    }
  }

  leaveConversation() {
    this.conversationBoxService.unselectConversation();
  }
}
