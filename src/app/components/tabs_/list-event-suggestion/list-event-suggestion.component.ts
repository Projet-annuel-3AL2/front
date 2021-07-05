import { Component, OnInit } from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {environment} from "../../../../environments/environment";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-list-event-suggestion',
  templateUrl: './list-event-suggestion.component.html',
  styleUrls: ['./list-event-suggestion.component.css']
})
export class ListEventSuggestionComponent implements OnInit {

  event$ : Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getSuggestionEvent();
  }

  getSuggestionEvent(){
    this.eventService.getSuggestion().subscribe({
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
