import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {UserService} from "../../../services/user/user.service";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-card-user-mange-event',
  templateUrl: './card-user-manage-event.component.html',
  styleUrls: ['./card-user-manage-event.component.css']
})
export class CardUserMangeEventComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('eventId') eventId: string;
  faCheckCircle = faCheckCircle;
  env: any;

  constructor(private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _userService: UserService,
              public _authService: AuthService) {
    this.env = environment
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
