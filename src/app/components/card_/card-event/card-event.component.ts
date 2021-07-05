import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input("event") event : Event = new Event();
  @Input('userSession') userSession: User;
  isAbleToJoin: boolean = true;
  canShow: boolean = false;
  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getEvent();
    this.canJoin();
  }


  // TODO : Récupérer la localisation avec coordonnées
  getLocalisation() {
    return "6 boulevard Maréchal Foch, 76200 Dieppe"
  }


  joinEvent(id: string) {
      this._eventService.postAddParticipant(id).subscribe({
        next: () =>{
          this.isAbleToJoin = false;
        },
        error: error => {
          if (!environment.production){
            console.error('There was an error!', error);
          }
        }
      });
      this.canJoin();
  }

  leaveEvent(id: string) {
    this._eventService.deleteParticipation(id).subscribe({
      next: () =>{
        this.isAbleToJoin = true;
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    });

  }

  canJoin() {
    this._eventService.getEventMembers(this.event.id).subscribe(users => {
      users.forEach(user => {
        if (user.id == this.userSession.id){
          this.isAbleToJoin = false;
        }
      })
    });
  }

  private getEvent() {
    this._eventService.getProfil(this.event.id).subscribe({
      next: event =>{
        this.event = event;
        this.canShow = true;
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }
}
