import { Component, OnInit } from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {EventService} from "../../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  listPost$: Post[];
  event: Event;
  eventId: string;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService,
              private _postService:PostService) { }

  ngOnInit(): void {
    this.eventId=this._activatedRoute.snapshot.paramMap.get("id");
    this.getEvents();
    this.getPosts();
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
