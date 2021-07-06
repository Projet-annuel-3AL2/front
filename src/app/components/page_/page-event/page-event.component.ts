import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateOrganisationComponent} from "../../dialog_/dialog-update-organisation/dialog-update-organisation.component";
import {DialogUpdateEventComponent} from "../../dialog_/dialog-update-event/dialog-update-event.component";

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageEventComponent implements OnInit {

  listPost$: Post[];
  event$: Event;
  eventId: string;
  faEllipsisH = faEllipsisH;
  userSession$: User;
  listParticipant$: User[] = [];
  isAbleToJoin: boolean = true;
  isOwnerB: boolean = false;
  isAdminB: boolean = false;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService,
              private _userService: UserService,
              private _authService: AuthService,
              private _organisationService: OrganisationService,
              public dialogReport: MatDialog,
              public dialogUpdateEvent: MatDialog
              ) { }

  ngOnInit(): void {
    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user=>{
      this.userSession$=user;
    });
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
    this.getEvent();
  }

  private getEvent() {
    this._eventService.getProfil(this.eventId).subscribe({
      next: data => {
        this.event$ = data;
        this.isOwner();
        // this.isAdmin();
        // this.getPosts();
        this.getParticipants();
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }


  isOwner() {
    this._organisationService.isOwner(this.event$.organisation.id).subscribe({
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

  // TODO : ne fonctionne pas
  isAdmin() {
    this._organisationService.isAdmin(this.event$.organisation.id).subscribe({
      next: bool => {
        this.isAdminB = bool;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  // TODO : Ne fonctionne pas
  private getPosts() {
    this._eventService.getEventPosts(this.event$.id).subscribe({
      next: posts => {
        this.listPost$ = posts;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getParticipants() {
    this._eventService.getEventMembers(this.eventId).subscribe({
      next: listUser =>{
        this.listParticipant$ = listUser;
        this.canJoin();
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }


  canJoin() {
    if (this.listParticipant$ != null){
      this.listParticipant$.forEach(user => {
        if (user.id == this.userSession$.id){
          this.isAbleToJoin = false;
        }
      })
    }
  }

  joinEvent(id: string) {
    this._eventService.postAddParticipant(id).subscribe({
      next: () =>{
        this.isAbleToJoin = false;
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    });
    this.canJoin();
  }

  leaveEvent(id: string) {
    this._eventService.deleteParticipation(id).subscribe({
      next: () =>{
        this.isAbleToJoin = true;
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    });
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.event$.id, reportType: ReportTypeEnum.EVENT}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showDialogueUpdateEvent() {
    const dialogRef = this.dialogUpdateEvent.open(DialogUpdateEventComponent, {
      width: '900px',
      data: {event: this.event$, userSession: this.userSession$}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
