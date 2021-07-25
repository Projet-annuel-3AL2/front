import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {faClock, faEllipsisH, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateEventComponent} from "../../dialog_/dialog-update-event/dialog-update-event.component";
import {Event} from "../../../shared/models/event.model";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageEventComponent implements OnInit {
  event: Event;
  faEllipsisH = faEllipsisH;
  faUserPlus = faUserPlus;
  faClock = faClock;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              public _eventService: EventService,
              public _authService: AuthService,
              private _organisationService: OrganisationService,
              public dialogReport: MatDialog,
              public dialogUpdateEvent: MatDialog,
              private _titleService: Title) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.updateEvent(params["eventId"]).then();
    });
  }

  async updateEvent(eventId: string) {
    this.event = await this._eventService.getEventById(eventId).toPromise();
    this._titleService.setTitle(this.event.name + " - " + environment.name);
    this._eventService.getEventPosts(eventId).toPromise().then(posts => this.event.posts = posts);
    this._eventService.getParticipants(eventId).toPromise().then(participants => this.event.participants = participants);
    this._eventService.getOwner(eventId).toPromise().then(owner => this.event.user = owner);
    this._eventService.getCategory(eventId).toPromise().then(category => this.event.category = category);
    this._eventService.getOrganisation(eventId).toPromise().then(organisation => this.event.organisation = organisation);
    this._eventService.isMember(eventId).toPromise().then(isMember => this.event.isMember = isMember);
    this._eventService.isOwner(eventId).toPromise().then(isOwner => this.event.isOwner = isOwner);
  }

  joinEvent() {
    this._eventService.joinEvent(this.event.id).toPromise().then();
  }

  leaveEvent() {
    this._eventService.leaveEvent(this.event.id).toPromise().then();
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.event.id, reportType: ReportTypeEnum.EVENT}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueUpdateEvent() {
    const dialogRef = this.dialogUpdateEvent.open(DialogUpdateEventComponent, {
      width: '600px',
      data: {event: this.event}
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  isEnd(): boolean {
    return new Date(this.event.endDate) < new Date(Date.now())
  }
}
