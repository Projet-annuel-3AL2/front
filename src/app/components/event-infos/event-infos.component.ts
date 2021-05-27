import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {

  @Input('event') event : Event = new Event();
  constructor() { }

  ngOnInit(): void {
  }

}
