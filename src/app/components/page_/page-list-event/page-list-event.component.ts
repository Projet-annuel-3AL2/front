import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {EventFilterComponent} from "../../event-filter/event-filter.component";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-list-event',
  templateUrl: './page-list-event.component.html',
  styleUrls: ['./page-list-event.component.css']
})
export class PageListEventComponent implements OnInit, AfterViewInit {
  eventsFilter$: Event[];
  @ViewChild(EventFilterComponent) eventFilterComponent;

  constructor(public _eventService: EventService,
              private _userService: UserService,
              private _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Événements - " + environment.name);
  }

  ngOnInit(): void {
    this.getNotEndEvents();
  }

  ngAfterViewInit() {
    this.eventsFilter$ = this.eventFilterComponent.listFilterEvent$;
  }

  private getNotEndEvents() {
    this._eventService.isEventFinished()
      .toPromise()
      .then();
  }
}
