import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {faCheckCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogResFriendshipRequestComponent} from "../../dialog_/dialog-res-friendship-request/dialog-res-friendship-request.component";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

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
    this._friendshipService.acceptFriendship(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.BEFRIENDED;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  delFriendshipRequest() {
    this._friendshipService.rejectFriendRequest(this.user.username).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    })
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }
}
