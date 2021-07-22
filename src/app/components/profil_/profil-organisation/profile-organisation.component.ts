import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateOrganisationComponent} from "../../dialog_/dialog-update-organisation/dialog-update-organisation.component";
import {DialogCreateEventComponent} from "../../dialog_/dialog-create-event/dialog-create-event.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-organisation',
  templateUrl: './profile-organisation.component.html',
  styleUrls: ['./profile-organisation.component.css']
})
export class ProfileOrganisationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  organisationId: string;
  faEllipsisH = faEllipsisH;
  userSession$: User;
  isOwnerB: boolean = false;
  isAdminB: boolean = false;
  isFollowing: boolean = false;
  private organisation$: Organisation;

  constructor(public _organisationService: OrganisationService,
              private route: ActivatedRoute,
              private _userService: UserService,
              private _authService: AuthService,
              public dialogReport: MatDialog,
              public dialogUpdateOrganisation: MatDialog,
              public dialogCreateEvent: MatDialog,
              private _titleService: Title
  ) {
  }
//TODO refactor subscribe to route params and do not use snapshot
  ngOnInit(): void {
    this.organisationId = this.route.snapshot.params['id']
    this._authService.getCurrentUser().subscribe()
    this._authService.user.subscribe(user => {
      this.userSession$ = user;
    });
    this.updateData();
    this._organisationService.organisation.subscribe(organisation => {
      this.organisation$ = organisation;
      this._titleService.setTitle(this.organisation$.name + " - "+environment.name);
    })
  }

  isOwner() {
    this._organisationService.isOwner(this.organisationId).subscribe({
      next: bool => {
        this.isOwnerB = bool;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  isAdmin() {
    this._organisationService.isAdmin(this.organisationId).subscribe({
      next: bool => {
        this.isAdminB = bool;
        this.getOrganisationInvitedUser();
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  canFollow() {
    this._userService.isFollowingOrganisation(this.organisationId).subscribe({
      next: bool => {
        this.isFollowing = bool;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  followOrganisation() {
    this._organisationService.followOrganisation(this.organisationId).subscribe({
      next: () => {
        this.isFollowing = true;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  unfollowOrganisation() {
    this._organisationService.unfollowOrganisation(this.organisationId).subscribe({
      next: () => {
        this.isFollowing = false;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '600px',
      data: {id: this.organisation$.id, reportType: ReportTypeEnum.ORGANISATION}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueUpdateOrganisation() {
    const dialogRef = this.dialogUpdateOrganisation.open(DialogUpdateOrganisationComponent, {
      width: '600px',
      data: {organisation: this.organisation$, userSession: this.userSession$}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {organisation: this.organisation$}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  private updateData() {
    this.getOrganisation();
    this.getOrganisationMember();
    this.getListEvent()
    this.canFollow();
    this.isOwner();
    this.isAdmin();
    this.getPostsOrganisation();
  }

  private getOrganisation() {
    this._organisationService.getOrganisation(this.organisationId).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getOrganisationMember() {
    this._organisationService.getMemberOrganisation(this.organisationId).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getListEvent() {
    this._organisationService.getEventCreated(this.organisationId).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getPostsOrganisation() {
    this._organisationService.getOrganisationPosts(this.organisationId).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getOrganisationInvitedUser() {
    this._organisationService.getInvitedOrganisation(this.organisationId).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }
}
