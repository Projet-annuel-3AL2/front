import {Component, Input, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {User} from "../../../shared/models/user.model";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {Message} from "../../../shared/models/message.model";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @Input()
  conversation: Conversation;
  message: string;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  user: User;

  constructor(private authService: AuthService, public conversationBoxService: ConversationBoxService, private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.conversation = this.conversationBoxService.selectedConversation;
    this.conversationService.getMessages(this.conversation.id)
      .subscribe(messages=>this.conversation.messages = messages);
    console.log(this.conversation)
  }

  getConversationName(): string {
    if (this.conversation.group !== undefined) {
      return this.conversation.group.name;
    } else if (this.conversation.organisation !== undefined) {
      return this.conversation.organisation.name;
    } else if(this.conversation.friendship) {
      return this.conversation.friendship.friendOne.id !== this.authService.getCurrentUserId() ? this.conversation.friendship.friendOne.username : this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }

  leaveConversation() {
    this.conversationBoxService.unselectConversation();
  }

  sendMessage() {
    let message: Message = new Message();
    message.text= this.message;
    this.conversationService.sendMessage(this.conversation.id, message).subscribe();
  }
}
