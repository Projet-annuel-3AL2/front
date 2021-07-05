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

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageEventComponent implements OnInit {

  listPost$: Post[];
  event: Event;
  eventId: string;
  faEllipsisH = faEllipsisH;
  userSession$: User;
  listParticipant$: User[];
  isAbleToJoin: boolean = true;
  isOwnerB: boolean = false;
  isAdminB: boolean = false;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService,
              private _userService: UserService,
              private _authService: AuthService,
              private _organisationService: OrganisationService
              ) { }

  ngOnInit(): void {
    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user=>{
      this.userSession$=user;
      this.isOwner();
      this.isAdmin();
    });
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
    this.getEvent();

    // this.getPosts();
  }

  private getPosts() {
    this._postService.getPostWithEventId(this.event.id).subscribe({
      next: data => {
        this.listPost$ = data;

      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }


  private getEvent() {
    this._eventService.getEventFull(this.eventId).subscribe({
      next: data => {
        this.event = data;
        this.canJoin();
      },
      error: error => {

        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  canJoin() {

    this._eventService.getEventMembers(this.event.id).subscribe({
      next: event =>{
        event.participants.forEach(user => {
          if (user.id == this.userSession$.id){
            this.isAbleToJoin = false;
          }
        });
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });

  }

  joinEvent(id: string) {
    this._eventService.postAddParticipant(this.userSession$.id, id).subscribe({
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
    this._eventService.deleteParticipantEvent(id, this.userSession$.id).subscribe({
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


  isOwner() {
    if(this.event.creator.id == this.userSession$.id){
      this.isOwnerB = true;
    }
  }

  isAdmin() {
    this._eventService.getEventOrganisationMembership(this.eventId).subscribe({
      next: listMemberShip => {
        listMemberShip.forEach(member => {
          if (member.user.id == this.userSession$.id && member.isAdmin){
            this.isAdminB = true;
          }
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })

  }
}
