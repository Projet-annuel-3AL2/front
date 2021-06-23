import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {EventFilterComponent} from "../../event_/event-filter/event-filter.component";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
@Component({
  selector: 'app-page-list-event',
  templateUrl: './page-list-event.component.html',
  styleUrls: ['./page-list-event.component.css']
})
export class PageListEventComponent implements OnInit, AfterViewInit {

  events$: Event[];
  eventsFilter$: Event[] = undefined;
  user: User;
  @ViewChild(EventFilterComponent) eventFilterComponent;

  constructor(private eventService: EventService,
              private userService: UserService,
              // private authService: AuthService
              ) {}

  ngOnInit(): void {
    this.events$ = this.eventService.fakeGetEvents();
    this.user = this.userService.fakeGetUser('a')
    //this.getSelectionEvents();
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
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

  canCreateEvent() {
    if (this.user != undefined){
      return this.user.certification !== undefined;
    }
    return false;
  }
}
