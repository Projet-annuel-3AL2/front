import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {Media} from "../../../shared/models/media.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationService} from "../../../services/conversation/conversation.service";

@Component({
  selector: 'app-conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.css']
})
export class ConversationCardComponent implements OnInit {
  @Input()
  conversation: Conversation;

  constructor(private conversationBoxService: ConversationBoxService, private authService: AuthService, private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.conversationService.getLastMessage(this.authService.getCurrentUserId())
        .subscribe(message=> {
          if(message) {
            this.conversation.messages = [message]
          }
          else {
            this.conversation.messages= [];
          }
        });
  }

  onConversationSelect() {
    this.conversationBoxService.selectConversation(this.conversation);
  }

  getPicture(): Media | undefined {
    if(this.conversation.organisation){
      return this.conversation.organisation?.profilePicture;
    }
    else if(this.conversation.friendship){
      if(this.conversation.friendship.friendOne.id !== this.authService.getCurrentUserId()){
        return this.conversation.friendship.friendOne?.profilePicture;
      }
      return this.conversation.friendship.friendTwo?.profilePicture;
    }
    return undefined;
  }

  getName(): string | undefined{
    if(this.conversation.organisation){
      return this.conversation.organisation.name;
    }
    else if(this.conversation.friendship){
      if(this.conversation.friendship.friendOne.id !== this.authService.getCurrentUserId()){
        return this.conversation.friendship.friendOne.username;
      }
      return this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }
}
