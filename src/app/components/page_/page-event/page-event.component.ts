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
  user: User;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService,
              private _userService: UserService,
              private _authService: AuthService
              ) { }

  ngOnInit(): void {
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.user=user;
    });
    // TODO: getEvent() et getPosts() pas activé
    // this.getEvent();
    // this.getPosts();
    // TODO: peut-être changer l'url pour avoir le nom au lieu de l'id ?
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
  }

  private getPosts() {
    this._postService.getPostByEventId(this.event.id).subscribe({
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
    this._eventService.getEventById(this.eventId).subscribe({
      next: data => {
        this.event = data;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  // TODO: J'ai pas la logique pour un truc propre -> Vérifier que this.user n'est pas dans UserList
  canJoin(eventId: string) {
    // return this._eventService.getEventMembers(eventId).subscribe(userList => {
    //   return false;
    // })
    return true;
  }

  // TODO: JoinEvent()
  joinEvent(id: string) {
    // this._eventService.postAddParticipant(this.user.id,id);
  }

  // TODO: LeaveEvent()
  leaveEvent(id: string) {
    // this._eventService.deleteParticipantEvent(id,this.user.id);
  }

  // TODO: IsOwner() dela page-event
  isOwner() {
    return true;
    // return this.event.creator.id == this.user.id;
  }
}
