import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {UserService} from "../../../services/user/user.service";
import {faCheckCircle, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";
import {DialogResFriendshipRequestComponent} from "../../dialog_/dialog-res-friendship-request/dialog-res-friendship-request.component";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card-user-manage-event',
  templateUrl: './card-user-manage-event.component.html',
  styleUrls: ['./card-user-manage-event.component.css']
})
export class CardUserManageEventComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('eventId') eventId: string;
  faCheckCircle = faCheckCircle;
  friendshipRequest: FriendRequestStatus = FriendRequestStatus.NONE;
  allFriendRequestStatus = FriendRequestStatus;
  env: any;
  faTimes=faTimes;

  constructor(private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _userService: UserService,
              public _authService: AuthService,
              public dialog: MatDialog) {
    this.env = environment
  }

  ngOnInit(): void {
    this.canAdd();
  }

  canAdd() {
    this._friendshipService.isFriendshipRequested(this.user.username).subscribe({
      next: requestStatus => {
        this.friendshipRequest = requestStatus;
      }
    })
  }

  askFriend() {
    this._friendshipService.sendFriendRequest(this.user.username).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.PENDING;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  removeFriend() {
    this._friendshipService.removeFriendship(this.user.username).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    })
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.user.username).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
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

  acceptFriendship() {
    this._friendshipService.acceptFriendship(this.user.username).subscribe({
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
}
