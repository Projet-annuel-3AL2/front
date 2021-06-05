import { Component, OnInit } from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  opened: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
