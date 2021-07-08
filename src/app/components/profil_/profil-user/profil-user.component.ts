import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../../shared/models/post.model";
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
import {DialogUpdateUserComponent} from "../../dialog_/dialog-update-user/dialog-update-user.component";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;

  user$: User;
  userSession$: User;
  listPost$: Post[] = [];
  listEvent$: Event[] = [];
  listUser$: User[] = [];
  friendshipRequest: FriendRequestStatus = FriendRequestStatus.NONE;
  allFriendRequestStatus = FriendRequestStatus;


  constructor(private _userService: UserService,
              private route: ActivatedRoute,
              private _postService: PostService,
              private _friendshipService: FriendshipService,
              private _eventService: EventService,
              private _authService: AuthService,
              public dialog: MatDialog,
              public dialogReport: MatDialog,
              public dialogCreateEvent: MatDialog,
              public dialogUpdateUser: MatDialog
  ) {
  }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];

    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user => {
      this.userSession$ = user;
      this.getUser(username);
    });
  }

  canAdd() {
    this._friendshipService.isFriendshipRequested(this.user$.username).subscribe({
      next: requestStatus => {
        console.log(requestStatus)
        this.friendshipRequest = requestStatus;
      }
    })
  }

  dellFriend() {
    this._friendshipService.removeFriendship(this.user$.username).subscribe({
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
    this._friendshipService.postFriendship(this.user$.username).subscribe({
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

  showDialogueRespondFriendRequest() {
    const dialogRef = this.dialog.open(DialogResFriendshipRequestComponent, {
      width: '500px',
      data: {userId: this.user$.username}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.friendshipRequest = result;
    })
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.user$.username, reportType: ReportTypeEnum.USER}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '900px',
      data: {userSession: this.userSession$, organisation: null}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  private getUser(username: string) {
    this._userService.getByUsername(username).subscribe({
      next: user => {
        this.user$ = user
        // this.getPosts(user.username);
        // this.getFriendsList();
        this.getEventParticipations();
        if (user.id != this.userSession$.id) {
          this.canAdd();
        }
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getPosts(username: string) {
    this._userService.getPosts(username).subscribe({
      next: posts => {
        this.listPost$ = posts;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getFriendsList() {
    this._userService.getFriends(this.user$.username).subscribe({
      next: users => {
        this.listUser$ = users;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getEventParticipations() {
    this._userService.getParticipations(this.user$.username).subscribe({
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

  showDialogueUpdateUser() {
    const dialogRef = this.dialogUpdateUser.open(DialogUpdateUserComponent, {
      width: '950px',
      data: {user: this.user$}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
