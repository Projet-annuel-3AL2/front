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
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession$=user;
    });
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
    this.getEvent();

    // this.getPosts();
  }

  private getEvent() {
    this._eventService.getEventById(this.eventId).subscribe({
      next: data => {
        this.event = data;
        this.isOwner();
        this.isAdmin();
        this.getPosts();
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
    if(this.event.creator.id == this.userSession$.id){
      this.isOwnerB = true;
    }
  }

  isAdmin() {
    this._organisationService.getMembersOrga(this.event.organisation.id).subscribe({
      next: organisationMemberships => {
        organisationMemberships.forEach(organisationMembership => {
          if (organisationMembership.user.id == this.userSession$.id && organisationMembership.isAdmin){
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

  private getPosts() {
    this._eventService.getEventPosts(this.event.id).subscribe({
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
}
