import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle, faEllipsisH, faTimes, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../../../environments/environment";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {DialogCreateEventComponent} from "../../dialog_/dialog-create-event/dialog-create-event.component";
import {DialogUpdateUserComponent} from "../../dialog_/dialog-update-user/dialog-update-user.component";
import {DialogAskCertificationComponent} from "../../dialog_/dialog-ask-certification/dialog-ask-certification.component";
import {DialogAskOrganisationComponent} from "../../dialog_/dialog-ask-organisation/dialog-ask-organisation.component";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Title} from "@angular/platform-browser";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  faUserPlus = faUserPlus;
  loading: boolean = false;
  offset: number = 0;
  limit: number = 10;
  user: User;
  faTimes = faTimes;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(public _userService: UserService,
              private route: ActivatedRoute,
              private _friendshipService: FriendshipService,
              private _eventService: EventService,
              public _authService: AuthService,
              public _organisationService: OrganisationService,
              public dialog: MatDialog,
              public dialogReport: MatDialog,
              public dialogCreateEvent: MatDialog,
              public dialogAskOrganisation: MatDialog,
              public dialogAskCertification: MatDialog,
              public dialogUpdateUser: MatDialog,
              private _titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._titleService.setTitle(params["username"] + " - " + environment.name);
      this.updateUser(params["username"]).then();
    });
  }

  async updateUser(username: string): Promise<void> {
    this.user = await this._userService.getByUsername(username).toPromise();
    this.user.createdPosts = [];
    this.getMorePosts();
    this._userService.getFriends(username).toPromise().then(friends =>this.user.friends=friends);
    this._userService.getParticipations(username).toPromise().then(eventParticipation =>this.user.eventsParticipation=eventParticipation);
    this._userService.hasBlocked(username).toPromise().then(isBlocked =>this.user.isBlocked=isBlocked);
    this._friendshipService.isFriendshipRequested(username).toPromise().then(friendshipStatus =>this.user.friendshipStatus=friendshipStatus);
    this._organisationService.whereIsAdmin(username).toPromise().then(administratedOrganisations =>this.user.administratedOrganisations=administratedOrganisations);
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.user.username, reportType: ReportTypeEnum.USER}
    });

    dialogRef.afterClosed().subscribe(() => this.updateUser(this.user.username));
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {organisation: null}
    });

    dialogRef.afterClosed().subscribe(() => this.updateUser(this.user.username));
  }

  async showDialogUpdateUser() {
    const dialogRef = this.dialogUpdateUser.open(DialogUpdateUserComponent, {
      width: '600px',
      data: {user: this.user}
    });


    dialogRef.afterClosed().subscribe(() => {
      this.updateUser(this.user.username)
    })
  }

  async showDialogAskCertification() {
    const dialogRef = this.dialogAskCertification.open(DialogAskCertificationComponent, {
      width: '600px',
      data: {user: this.user.username}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogAskOrganisation() {
    const dialogRef = this.dialogAskOrganisation.open(DialogAskOrganisationComponent, {
      width: '950px',
      data: {user: this.user.username}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  removeFriend() {
    this._friendshipService.removeFriendship(this.user.username).toPromise().then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  askFriend() {
    this._friendshipService.sendFriendRequest(this.user.username).toPromise().then(() => this.user.friendshipStatus = FriendRequestStatus.PENDING);
  }

  cancelRequest() {
    this._friendshipService.cancelFriendRequest(this.user.username).toPromise().then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  delFriendshipRequest() {
    this._friendshipService.rejectFriendRequest(this.user.username).toPromise().then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);

  }

  acceptFriendship() {
    this._friendshipService.acceptFriendship(this.user.username).toPromise().then(() => this.user.friendshipStatus = FriendRequestStatus.BEFRIENDED);
  }

  async sendJoinOrganisation(id: string) {
    this._organisationService.postInvitation(id, this.user.id).toPromise().then();
  }

  blockUser() {
    this._userService.block(this.user.username)
      .toPromise()
      .then(() => this.user.isBlocked = true);
  }

  unblockUser() {
    this._userService.unblock(this.user.username)
      .toPromise()
      .then(() => this.user.isBlocked = false);
  }

  removePost($event: Post) {
    this.user.createdPosts = this.user.createdPosts.filter(post => post.id !== $event.id);
  }

  triggerGetMore($event) {
    if ($event.endIndex !== this.user.createdPosts.length - 1 || this.loading) return;
    this.getMorePosts();
  }

  getMorePosts() {
    this.loading = true;
    this._userService.getPosts(this.user.username, this.limit, this.offset)
      .toPromise()
      .then(posts => {
        this.user.createdPosts = this.user.createdPosts.concat(posts);
        this.offset += this.limit;
        if (posts.length > 0) {
          this.loading = false;
        }
      });
  }
}
