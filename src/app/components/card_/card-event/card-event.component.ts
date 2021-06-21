import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {
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
