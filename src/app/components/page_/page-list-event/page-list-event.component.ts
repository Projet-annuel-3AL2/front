import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {EventFilterComponent} from "../../event_/event-filter/event-filter.component";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-page-list-event',
  templateUrl: './page-list-event.component.html',
  styleUrls: ['./page-list-event.component.css']
})
export class PageListEventComponent implements OnInit, AfterViewInit {

  events$: Event[];
  eventsFilter$: Event[] = undefined;
  @ViewChild(EventFilterComponent) eventFilterComponent;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    //this.getSelectionEvents();
  }

  private getSelectionEvents() {
    this.eventService.getNotEndEvent().subscribe({
      next: data => {
        this.events$ = data;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  ngAfterViewInit()  {
    this.eventsFilter$ = this.eventFilterComponent.listFilterEvent$;
  }
}
