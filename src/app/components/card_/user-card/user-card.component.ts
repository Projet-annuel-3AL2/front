import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {faCheckCircle, faUserPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  user: User;
  faCheckCircle = faCheckCircle;
  faUserPlus = faUserPlus;
  faTimes = faTimes;
  statusEnum: typeof FriendRequestStatus = FriendRequestStatus;

  constructor(private _friendshipService: FriendshipService,
              public _authService: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.canAdd();
  }

  canAdd() {
    this._friendshipService.isFriendshipRequested(this.user.username)
      .toPromise()
      .then(friendshipStatus => this.user.friendshipStatus = friendshipStatus);
  }

  askFriend() {
    this._friendshipService.sendFriendRequest(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = FriendRequestStatus.PENDING);
  }

  removeFriend() {
    this._friendshipService.removeFriendship(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  acceptFriendship() {
    this._friendshipService.acceptFriendship(this.user.username).toPromise().then(() =>{
      this.user.friendshipStatus = FriendRequestStatus.BEFRIENDED;
    })
  }

  delFriendshipRequest() {
    this._friendshipService.rejectFriendRequest(this.user.username).toPromise().then(() => {
      this.user.friendshipStatus = FriendRequestStatus.NONE;
    })
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }
}
