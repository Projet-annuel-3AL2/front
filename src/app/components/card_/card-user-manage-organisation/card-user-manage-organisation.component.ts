import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {faCheckCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {environment} from "../../../../environments/environment";
import {FriendRequestStatus} from "../../../shared/FriendshipRequestStatus.enum";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card-user-manage-organisation',
  templateUrl: './card-user-manage-organisation.component.html',
  styleUrls: ['./card-user-manage-organisation.component.css']
})
export class CardUserManageOrganisationComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('organisation') organisation: Organisation;
  @Input('isOwner') isOwner: boolean;
  faCheckCircle = faCheckCircle;
  faUserPlus = faUserPlus;
  friendshipRequest: FriendRequestStatus;
  userIsAdmin: boolean = false;
  allFriendRequestStatus = FriendRequestStatus;
  userIsOwner: Boolean = false;
  env: any;

  constructor(private _friendshipService: FriendshipService,
              public _authService: AuthService,
              private _userService: UserService,
              private _organisationService: OrganisationService,
              public dialog: MatDialog) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.canAddFriend();
    this.getStatusUserInOrga();
  }

  canAddFriend() {
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

  dellFriend() {
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

  deleteMembership(userId: string) {
    this._organisationService.deleteOrganisationMembership(userId, this.organisation.id).subscribe({
      next: () => {
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  giveAdmin(userId: string) {
    this._organisationService.giveAdminToMember(userId, this.organisation.id).subscribe({
      next: () => {
        this.userIsAdmin = true;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  removeAdmin(userId: string) {
    this._organisationService.removeAdminToAdminMember(userId, this.organisation.id).subscribe({
      next: () => {
        this.userIsAdmin = false;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  private getStatusUserInOrga() {
    this._organisationService.isUserAdmin(this.organisation.id, this.user.id).subscribe({
      next: bool => {
        this.userIsAdmin = bool;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    })
    if (!this.isOwner) {
      this._organisationService.isUserOwner(this.organisation.id, this.user.username).subscribe({
        next: bool => {
          this.userIsOwner = bool;
        },
        error: err => {
          if (!environment.production) {
            console.log(err)
          }
        }
      })
    }
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
