import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input("event") event : Event = new Event()
  constructor() { }

  ngOnInit(): void {
  }

  joinEvent(id: string) {

  }

  getLocalisation() {
    return "6 boulevard Maréchal Foch, 76200 Dieppe"
  }
}
