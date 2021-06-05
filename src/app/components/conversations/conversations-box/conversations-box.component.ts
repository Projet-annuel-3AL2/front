import { Component, OnInit } from '@angular/core';
import {faUserCircle, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Conversation} from "../../../shared/models/conversation.model";

@Component({
  selector: 'app-conversations-box',
  templateUrl: './conversations-box.component.html',
  styleUrls: ['./conversations-box.component.css'],
  animations:[
    trigger('openClose', [
      state('open',style({
        transform: 'translateY(00%)'
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
export class ConversationsBoxComponent implements OnInit {
  faUserCircle = faUserCircle;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  opened: boolean;
  conversations: Conversation[];
  constructor() { }

  ngOnInit(): void {
  }

}
