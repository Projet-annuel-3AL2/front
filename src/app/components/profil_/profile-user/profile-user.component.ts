import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
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
import {DialogUpdateUserComponent} from "../../dialog_/dialog-update-user/dialog-update-user.component";
import {DialogAskCertificationComponent} from "../../dialog_/dialog-ask-certification/dialog-ask-certification.component";
import {DialogAskOrganisationComponent} from "../../dialog_/dialog-ask-organisation/dialog-ask-organisation.component";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  username: string;
  friendshipRequest: FriendRequestStatus = FriendRequestStatus.NONE;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(public _userService: UserService,
              private route: ActivatedRoute,
              private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _authService: AuthService,
              public dialog: MatDialog,
              public dialogReport: MatDialog,
              public dialogCreateEvent: MatDialog,
              public dialogAskOrganisation: MatDialog,
              public dialogAskCertification: MatDialog,
              public dialogUpdateUser: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params["username"];
      this.updateUser().then();
    });
  }

  async updateUser(): Promise<void> {
    await this._userService.getByUsername(this.username).toPromise();
    await this._userService.getPosts(this.username).toPromise();
    await this._userService.getFriends(this.username).toPromise();
    await this._userService.getParticipations(this.username).toPromise();
    await this._friendshipService.isFriendshipRequested(this.username).subscribe(friendshipRequest => this.friendshipRequest = friendshipRequest);
  }

  showDialogueRespondFriendRequest() {
    const dialogRef = this.dialog.open(DialogResFriendshipRequestComponent, {
      width: '500px',
      data: {userId: this.username}
    });
    dialogRef.afterClosed().subscribe(() => this.updateUser());
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.username, reportType: ReportTypeEnum.USER}
    });

    dialogRef.afterClosed().subscribe(() => this.updateUser());
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {organisation: null}
    });

    dialogRef.afterClosed().subscribe(() => this.updateUser());
  }

  async showDialogUpdateUser() {
    let usr;
    this._userService.user.subscribe(user => {
      usr = user
    });
    const dialogRef = this.dialogUpdateUser.open(DialogUpdateUserComponent, {
      width: '950px',
      data: {usr}
    });


    dialogRef.afterClosed().subscribe(() => {
    })
  }

  // TODO : ne fonctionne pas
  async showDialogAskCertification() {
    const dialogRef = this.dialogAskCertification.open(DialogAskCertificationComponent, {
      width: '950px',
      data: {user: this.username}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  // TODO : ne fonctionne pas
  showDialogAskOrganisation() {
    const dialogRef = this.dialogAskOrganisation.open(DialogAskOrganisationComponent, {
      width: '950px',
      data: {user: this.username}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  removeFriend() {
    this._friendshipService.removeFriendship(this.username).subscribe({
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

  askFriend() {
    this._friendshipService.sendFriendRequest(this.username).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.PENDING;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.username).subscribe({
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
}
