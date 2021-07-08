import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-res-friendship-request',
  templateUrl: './dialog-res-friendship-request.component.html',
  styleUrls: ['./dialog-res-friendship-request.component.css']
})
export class DialogResFriendshipRequestComponent implements OnInit {
  friendshipRequestStatus: FriendRequestStatus;

  constructor(public dialogRef: MatDialogRef<DialogResFriendshipRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private _friendshipService: FriendshipService) {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  acceptFriendship() {

    this._friendshipService.acceptFriendship(this.data.userId).subscribe({
      next: () => {
        this.friendshipRequestStatus = FriendRequestStatus.BEFRIENDED;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  delFriendshipRequest() {
    this._friendshipService.rejectFriendRequest(this.data.userId).subscribe({
      next: () => {
        this.friendshipRequestStatus = FriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    })
  }
}
