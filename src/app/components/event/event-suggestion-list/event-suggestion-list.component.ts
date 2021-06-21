import { Component, OnInit } from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {environment} from "../../../../environments/environment";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-event-suggestion-list',
  templateUrl: './event-suggestion-list.component.html',
  styleUrls: ['./event-suggestion-list.component.css']
})
export class EventSuggestionListComponent implements OnInit {

  event$ : Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.event$ = this.eventService.getEvents();
    // this.getSuggestionEvent();
  }

  getSuggestionEvent(){
    this.eventService.getNotEndEvent().subscribe({
      next: data => {
        this.event$ = data;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

}
