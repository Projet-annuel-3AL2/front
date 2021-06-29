import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogResFriendshipRequestComponent} from "../../dialog_/dialog-res-friendship-request/dialog-res-friendship-request.component";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('user') user: User = new User()
  @Input('userSession') userSession: User;
  faCheckCircle = faCheckCircle;
  friendshipRequest: FriendRequestStatus = FriendRequestStatus.NONE;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(private _friendshipService: FriendshipService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.canAdd();
  }

  canAdd() {
    this._friendshipService.isFriendshipRequested(this.user.id, this.userSession.id).subscribe({
      next: requestStatus => {
        this.friendshipRequest = requestStatus;
      }
    })
  }

  askFriend() {
    this._friendshipService.postFriendship(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.PENDING;
      },
      error: err => {
        if (!environment.production){
          console.log(err)
        }
      }
    });
  }

  dellFriend() {
    this._friendshipService.removeFriendship(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production){
          console.log(err)
        }
      }
    })
  }

  showDialogueRespondFriendRequest() {
    const dialogRef = this.dialog.open(DialogResFriendshipRequestComponent, {
      width: '500px',
      data: {userId: this.user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.friendshipRequest = result;
    })
  }
}
