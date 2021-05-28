import { Component, OnInit } from '@angular/core';
import {Event} from '../../shared/models/event.model';
import {EventService} from "../../services/event/event.service";
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events$: Event[];
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getSelectionEvents();
  }

  private getSelectionEvents() {
    this.events$ = this.eventService.getEvents()
  }
}
