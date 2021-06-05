import { Component, OnInit } from '@angular/core';
import {faUserCircle, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-conversations-box',
  templateUrl: './conversations-box.component.html',
  styleUrls: ['./conversations-box.component.css']
})
export class ConversationsBoxComponent implements OnInit {
  faUserCircle = faUserCircle;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  opened: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
