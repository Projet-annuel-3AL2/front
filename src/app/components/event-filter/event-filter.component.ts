import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EventDialogMapsComponent} from "../event-dialog-maps/event-dialog-maps.component";
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {EventService} from "../../services/event/event.service";

export interface EventDialogData {
  userLocalisation: string;
}

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
  userLocalisation: string;
  listFilterEvent$: Event[];
  pi
  constructor(public dialog: MatDialog,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.isLocated = false;

  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) ;
    }

    return value;
  }

  filterRecherche() {
    this.listFilterEvent$ = this.eventService.getEventFilter();
  }

  showDialogMapsCollapse(): void {
    const dialogRef = this.dialog.open(EventDialogMapsComponent, {
      width: '1000px',

      data: {userLocalisation: this.userLocalisation}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLocated = true;
      this.userLocalisation = result;
    })
  }
}
