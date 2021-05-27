import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {

  @Input('event') event : Event = new Event();

  constructor() { }

  ngOnInit(): void {
  }

}
