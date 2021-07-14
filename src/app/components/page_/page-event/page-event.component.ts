import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../../services/event/event.service";
import {Event} from "../../../shared/models/event.model";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateEventComponent} from "../../dialog_/dialog-update-event/dialog-update-event.component";

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageEventComponent implements OnInit {
  eventId: string;
  faEllipsisH = faEllipsisH;
  isAbleToJoin: boolean = true;

  // TODO : les rendres dynamiques
  isOwnerB: boolean = true;
  isAdminB: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              public _eventService: EventService,
              public _authService: AuthService,
              private _organisationService: OrganisationService,
              public dialogReport: MatDialog,
              public dialogUpdateEvent: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.eventId = params["eventId"];
      this.updateEvent().then();
    });
  }

  async updateEvent() {
    await this._eventService.getEventById(this.eventId).toPromise();
    await this._eventService.getEventPosts(this.eventId).toPromise();
    await this._eventService.getParticipants(this.eventId).toPromise();
    await this._eventService.getOwner(this.eventId).toPromise();
    await this._eventService.getCategory(this.eventId).toPromise();
    await this._eventService.getOrganisation(this.eventId).toPromise();
    await this._eventService.isMember(this.eventId).toPromise();

  }

  joinEvent(id: string) {
    this._eventService.joinEvent(id).subscribe();
  }

  leaveEvent(id: string) {
    this._eventService.deleteParticipation(id).subscribe({
      next: () => {
        this.isAbleToJoin = true;
      },
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    });
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.eventId, reportType: ReportTypeEnum.EVENT}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueUpdateEvent() {
    let event: Event;
    this._eventService.event.subscribe(eventR => {
      event = eventR
    });
    const dialogRef = this.dialogUpdateEvent.open(DialogUpdateEventComponent, {
      width: '600px',
      data: {event: event}
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
