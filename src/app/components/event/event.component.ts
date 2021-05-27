import { Component, OnInit } from '@angular/core';
import {Event} from '../../shared/models/event.model';
import {EventService} from "../../services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;
  id: String;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _eventService:EventService) { }

  ngOnInit(): void {
    this.id=this._activatedRoute.snapshot.paramMap.get("id");
    this.event=this._eventService.getEvent(this.id);

  }

}
