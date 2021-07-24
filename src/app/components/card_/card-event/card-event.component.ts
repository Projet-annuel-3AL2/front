import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {UserService} from "../../../services/user/user.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {environment} from "../../../../environments/environment";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";
import {MapService} from "../../../services/map/map.service";

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input("event") event: Event = new Event();
  isAbleToJoin: boolean = true;
  faCheckCircle = faCheckCircle;
  userSession: User;
  env = environment;
  address: any;

  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _mapService: MapService,
    private _authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.updateData();

    this.canJoin();
  }

  async joinEvent(id: string) {
    this._eventService.joinEvent(id).subscribe({
      next: () => {
        this.isAbleToJoin = false;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    });
    this.canJoin()
  }

  leaveEvent(id: string) {
    this._eventService.leaveEvent(id).subscribe({
      next: () => {
        this.isAbleToJoin = true;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    });

  }

  async canJoin() {
    await this._authService.user.subscribe(user => {
      this._eventService.getEventMembers(this.event.id).subscribe(users => {
        users.forEach(user => {
          if (user.id == user.id) {
            this.isAbleToJoin = false;
          }
        })
      });
    })

  }

  private getEvent() {
    this._eventService.getProfile(this.event.id).subscribe({
      next: event => {
        this.event = event;
        this._mapService.getAddressFromLatLng(this.event.latitude, this.event.longitude).subscribe(address => this.address = address);

      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    });
  }

  private updateData() {
    this.getEvent();
  }

  isEnd(): boolean {
    return new Date(this.event.endDate) > new Date(Date.now())
  }
}
