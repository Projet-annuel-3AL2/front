import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input("event") event : Event = new Event()
  user: User;

  constructor(
    private userService: UserService,
    private eventService: EventService
    // private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.fakeGetUser('fakeData');
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
  }


  // TODO : Récupérer la localisation avec coordonnées
  getLocalisation() {
    return "6 boulevard Maréchal Foch, 76200 Dieppe"
  }

  joinEvent(id: string) {
      // this.eventService.postAddParticipant(this.user.id, id);
  }

  leaveEvent(id: string) {
    // this.eventService.deleteParticipantEvent(id, this.user.id);
  }

  // TODO: J'ai pas la logique pour un truc propre -> Vérifier que this.user n'est pas dans UserList
  canJoin(eventId: string) {
    // return this.eventService.getEventMembers(eventId).subscribe(userList => {
    //   return false;
    // })
    return true;
  }

}
