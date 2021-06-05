import { Component, OnInit } from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Conversation} from "../../../shared/models/conversation.model";

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css'],
  animations:[
    trigger('openClose', [
      state('open',style({
        transform: 'translateY(0%)'
      })),
      state('closed',style({
        transform: 'translateY(0%)'
      })),
      transition('closed => open', [
        animate('300ms ease-out', style({transform: 'translateY(0%)'}))
      ]),
      transition('open => closed', [
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
})
export class ConversationsListComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  opened: boolean;
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
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
