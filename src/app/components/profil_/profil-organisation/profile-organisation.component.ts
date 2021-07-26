import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faEllipsisH, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
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
  faUserPlus = faUserPlus;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  organisation: Organisation;

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

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.updateOrganisation(params['id']).then(()=>this.updateData());
      });

  }

  private async updateOrganisation(organisationId:string){
    this.organisation = await this._organisationService.getOrganisation(organisationId).toPromise();
    this.updateData();
  }

  private updateData() {
    this._organisationService.getMemberOrganisation(this.organisation.id).toPromise().then(members=>this.organisation.members=members);
    this._organisationService.getEventCreated(this.organisation.id).toPromise().then(events=>this.organisation.events = events);
    this._userService.isFollowingOrganisation(this.organisation.id).toPromise().then(isFollower => this.organisation.isFollower=isFollower);
    this._organisationService.isOwner(this.organisation.id).toPromise().then(isOwner => this.organisation.isOwner=isOwner);
    this._organisationService.isAdmin(this.organisation.id).toPromise().then(isAdmin => this.organisation.isAdmin=isAdmin);
    this._organisationService.getOrganisationPosts(this.organisation.id).toPromise().then(posts => this.organisation.posts=posts);

  }


  followOrganisation() {
    this._organisationService.followOrganisation(this.organisation.id)
      .toPromise()
      .then(() => this.organisation.isFollower = true);
  }

  unfollowOrganisation() {
    this._organisationService.unfollowOrganisation(this.organisation.id)
      .toPromise()
      .then(() => this.organisation.isFollower = false);
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '600px',
      data: {id: this.organisation.id, reportType: ReportTypeEnum.ORGANISATION}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueUpdateOrganisation() {
    const dialogRef = this.dialogUpdateOrganisation.open(DialogUpdateOrganisationComponent, {
      width: '600px',
      data: {organisation: this.organisation}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {organisation: this.organisation}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
