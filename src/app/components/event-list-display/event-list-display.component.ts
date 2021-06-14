import {Component, Inject, Input, OnInit} from '@angular/core';
import {Event} from '../../shared/models/event.model';
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-event-list-display',
  templateUrl: './event-list-display.component.html',
  styleUrls: ['./event-list-display.component.css']
})
export class EventListDisplayComponent implements OnInit {
  @Input("events") events$: Event[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
