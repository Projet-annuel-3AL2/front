import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {UserService} from "../../../services/user/user.service";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
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
  allFriendRequestStatus = FriendRequestStatus;
  env: any;

  constructor(private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _userService: UserService,
              public _authService: AuthService,
              public dialog: MatDialog) {
    this.env = environment
  }

  ngOnInit(): void {
    this.canAdd().then();
  }

  async canAdd() {
    this.user.friendshipStatus = await this._friendshipService.isFriendshipRequested(this.user.username).toPromise();
  }

  askFriend() {
    this._friendshipService.sendFriendRequest(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = this.allFriendRequestStatus.PENDING);
  }

  removeFriend() {
    this._friendshipService.removeFriendship(this.user.username)
      .toPromise()
      .then(() => this.user.friendshipStatus = this.allFriendRequestStatus.NONE);
  }

  showDialogueRespondFriendRequest() {
    const dialogRef = this.dialog.open(DialogResFriendshipRequestComponent, {
      width: '500px',
      data: {userId: this.user.username}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.canAdd();
    })
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.user.username).toPromise().then(() => {
        this.user.friendshipStatus = FriendRequestStatus.NONE;
      });
  }

  deleteParticipantEvent(userId: string) {
    this._eventService.deleteParticipantEvent(this.eventId, userId).toPromise().then();
  }
}
