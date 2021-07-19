import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {UserService} from "../../../services/user/user.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {environment} from "../../../../environments/environment";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";

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

  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.updateData();

    this.canJoin();
  }


  // TODO : Récupérer la localisation avec coordonnées
  getLocalisation() {
    return "6 boulevard Maréchal Foch, 76200 Dieppe"
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
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  private updateData() {
    this.getEvent();

  }
}
