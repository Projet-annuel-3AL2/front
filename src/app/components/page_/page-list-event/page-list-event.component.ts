import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {EventFilterComponent} from "../../event-filter/event-filter.component";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-page-list-event',
  templateUrl: './page-list-event.component.html',
  styleUrls: ['./page-list-event.component.css']
})
export class PageListEventComponent implements OnInit, AfterViewInit {

  eventsFilter$: Event[] = undefined;
  @ViewChild(EventFilterComponent) eventFilterComponent;

  constructor(public _eventService: EventService,
              private _userService: UserService,
              private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // TODO: en lien avec event-filter, faut réfléchir a la logique derriere
    this.getNotEndEvents();
  }

  ngAfterViewInit() {
    this.eventsFilter$ = this.eventFilterComponent.listFilterEvent$;
  }

  private getNotEndEvents() {
    this._eventService.isEventFinished().subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }
}
