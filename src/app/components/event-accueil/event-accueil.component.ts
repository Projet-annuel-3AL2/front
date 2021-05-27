import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";

@Component({
  selector: 'app-event-accueil',
  templateUrl: './event-accueil.component.html',
  styleUrls: ['./event-accueil.component.css']
})
export class EventAccueilComponent implements OnInit {

  @Input('event') event : Event = new Event();
  
  constructor() { }

  ngOnInit(): void {
  }

}
