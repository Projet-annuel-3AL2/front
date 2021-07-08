import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../../services/post/post.service";
import {Event} from '../../../shared/models/event.model';
import {environment} from "../../../../environments/environment";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {DialogResFriendshipRequestComponent} from "../../dialog_/dialog-res-friendship-request/dialog-res-friendship-request.component";
import {MatDialog} from "@angular/material/dialog";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {DialogCreateEventComponent} from "../../dialog_/dialog-create-event/dialog-create-event.component";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  username: string;
  listEvent$: Event[] = [];
  listUser$: User[] = [];
  friendshipRequest: FriendRequestStatus = FriendRequestStatus.NONE;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(public _userService: UserService,
              private route: ActivatedRoute,
              public _postService: PostService,
              private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _authService: AuthService,
              public dialog: MatDialog,
              public dialogReport: MatDialog,
              public dialogCreateEvent: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
    {
      this.username = params["username"];
      this.updateUser();
    });
  }

  async showDialogueRespondFriendRequest() {
    const dialogRef = this.dialog.open(DialogResFriendshipRequestComponent, {
      width: '500px',
      data: {userId: (await this._userService.user.toPromise()).username}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.friendshipRequest = result;
    })
  }

  async showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: (await this._userService.user.toPromise()).username, reportType: ReportTypeEnum.USER}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  async showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '900px',
      data: {userSession: await this._authService.user.toPromise(), organisation: null}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  updateUser(): void{
    this._userService.getByUsername(this.username).subscribe();
    this._userService.getPosts(this.username).subscribe();
  }

  async canAdd() {
    this._friendshipService.isFriendshipRequested((await this._userService.user.toPromise()).username).subscribe({
      next: requestStatus => {
        console.log(requestStatus)
        this.friendshipRequest = requestStatus;
      }
    })
  }

  async removeFriendship() {
    this._friendshipService.removeFriendship((await this._userService.user.toPromise()).username).subscribe({
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

  async askFriend() {
    this._friendshipService.sendFriendRequest((await this._userService.user.toPromise()).username).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.PENDING;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    })
  }

  private async getEventParticipations() {
    this._userService.getParticipations((await this._userService.user.toPromise()).username).subscribe({
      next: events => {
        this.listEvent$ = events;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }
}
