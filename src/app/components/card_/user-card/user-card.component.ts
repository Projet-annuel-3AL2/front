import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('user') user: User = new User()
  @Input('userSession') userSession: User;

  faCheckCircle = faCheckCircle;
  constructor(private _friendshipService: FriendshipService) { }

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
}
