import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event} from '../../../shared/models/event.model';

@Component({
  selector: 'app-event-suggestion',
  templateUrl: './event-suggestion.component.html',
  styleUrls: ['./event-suggestion.component.css']
})
export class EventSuggestionComponent implements OnInit {

   @Input('event') event : Event = new Event();
  constructor() { }

  ngOnInit(): void {
  }

}
