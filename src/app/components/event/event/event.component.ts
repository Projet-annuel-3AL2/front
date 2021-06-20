import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventComponent implements OnInit {

  listPost$: Post[];
  event: Event;
  eventId: string;
  faEllipsisH = faEllipsisH;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService) { }

  ngOnInit(): void {
    this.event = this._eventService.getEvent('a');
    this.listPost$ = this._postService.getRelatedPost('a');
    this.eventId = '1';
    // this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
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
    // TODO : Récupéré Id de l'user actuel
    const userId = '1'
    this._eventService.postAddParticipant(userId, this.eventId);
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
}
