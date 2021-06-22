import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import { faEllipsisH, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";

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
  faCheckCircle = faCheckCircle;
  actualDate: Date;
  user: User;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService,
              private _userService: UserService,
              // private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.event = this._eventService.fakeGetEvent('a');
    this.listPost$ = this._postService.fakeGetRelatedPost('a');
    this.user = this._userService.fakeGetUser('a');
    this.actualDate = new Date(Date.now());
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
    // this.getEvents();
    // this.getPosts();
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


  joinEvent(id: string) {
    this._eventService.postAddParticipant(this.user.id,id);
  }

  leaveEvent(id: string) {
    this._eventService.deleteParticipantEvent(id,this.user.id);
  }

  private getEvents() {
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
    return this._eventService.getEventMembers(eventId).subscribe(userList => {
      return false;
    })
  }

}
