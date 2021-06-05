import { Component, OnInit } from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  conversations: Conversation[] = [
    {
      messages:[
        {
          user:{
            username:"aaaa",
            id:"aaa"
          },id:"aaaa",
          createdAt: new Date(),
          text:"aaaaaaaaaaaaaaaa",
          updatedAt: new Date()
        }
      ],
      friendship:{
        friendTwo:{
        username:"aaaa",
        id:"aaa"
        },
        friendOne:{
        username:"aaaa",
        id:"bbb"
      },
        conversation:null
      }
    }
  ];

  constructor(public conversationBoxService: ConversationBoxService) {
  }

  ngOnInit(): void {
  }
}
