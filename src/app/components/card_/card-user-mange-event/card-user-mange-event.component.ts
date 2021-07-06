import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {UserService} from "../../../services/user/user.service";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card-user-mange-event',
  templateUrl: './card-user-mange-event.component.html',
  styleUrls: ['./card-user-mange-event.component.css']
})
export class CardUserMangeEventComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('eventId') eventId: string;
  @Input('userSession') userSession: User;
  faCheckCircle = faCheckCircle;

  constructor(private _friendshipService: FriendshipService,
              private _eventService: EventService,
              private _userService: UserService) {
  }

  ngOnInit(): void {

  }

  // TODO : Logique de Un user peut ajouter ou non un amis (voir list d'amis)
  canAdd(userId: string) {
    return true;
  }

  askFriend(username: string) {
    // this._friendshipService.postFriendship(username);
  }

  dellFriend(username: string) {
    // this._friendshipService.removeFriendship(username)
  }

  deleteParticipantEvent(userId: string) {
    this._eventService.deleteParticipantEvent(this.eventId, userId).subscribe({
      next: () => {

      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }
}
