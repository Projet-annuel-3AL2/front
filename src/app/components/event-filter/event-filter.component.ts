import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {
  isLocated: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLocated = false;
  }

  showModelMapsCollapse() {

  }
}
