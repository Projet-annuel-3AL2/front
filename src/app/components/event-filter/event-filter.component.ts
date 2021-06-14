import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {
  isLocated: boolean;
  range: FormGroup;
  listTypeEvent: any = [
    'Nettoyage plage',
    'Collecte',
    'manifestation',
    'découverte'
  ];
  constructor() { }

  ngOnInit(): void {
    this.isLocated = false;
    this.initFormDateRangePicker();

  }

  showModelMapsCollapse() {

  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) ;
    }

    return value;
  }

  initFormDateRangePicker(){
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  filterRecherche() {

  }
}
