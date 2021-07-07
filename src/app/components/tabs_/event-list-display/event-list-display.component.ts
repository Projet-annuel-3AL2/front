import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {User} from "../../../shared/models/user.model";


@Component({
  selector: 'app-event-list-display',
  templateUrl: './event-list-display.component.html',
  styleUrls: ['./event-list-display.component.css']
})
export class EventListDisplayComponent implements OnInit {
  @Input("events") events: Event[] = [];
  @Input('userSession') userSession: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
