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

  events$: Event[];
  eventsFilter$: Event[] = undefined;
  userSession$: User;
  @ViewChild(EventFilterComponent) eventFilterComponent;


  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _authService: AuthService
              ) {}

  ngOnInit(): void {
    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user=>{
      this.userSession$=user;
    });
    // TODO: en lien avec event-filter, faut réfléchir a la logique derriere
    this.getNotEndEvents();
  }

  private getNotEndEvents() {
    this._eventService.getNotEndEvent().subscribe({
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
