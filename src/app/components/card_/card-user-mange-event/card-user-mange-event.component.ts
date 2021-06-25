import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-user-mange-event',
  templateUrl: './card-user-mange-event.component.html',
  styleUrls: ['./card-user-mange-event.component.css']
})
export class CardUserMangeEventComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('eventId') eventId: string;
  faCheckCircle = faCheckCircle;
  userSession: User;

  constructor(private _friendshipService: FriendshipService,
              private _eventService: EventService,
              private _authService: AuthService,
              private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession=user;
    });
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
    this._eventService.deleteParticipantEvent(this.eventId, userId);
  }
}
