import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../shared/models/event.model';
import {EventService} from "../../services/event/event.service";
import {EventFilterComponent} from "../event-filter/event-filter.component";
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {

  events$: Event[];
  eventsFilter$: Event[] = undefined;
  @ViewChild(EventFilterComponent) eventFilterComponent;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getSelectionEvents();
  }

  private getSelectionEvents() {
    this.events$ = this.eventService.getEvents()
  }

  ngAfterViewInit()  {
    this.eventsFilter$ = this.eventFilterComponent.listFilterEvent$;
  }
}
