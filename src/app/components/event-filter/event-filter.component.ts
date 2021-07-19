import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EventDialogMapsComponent} from "../dialog_/event-dialog-maps/event-dialog-maps.component";
import {Event} from "../../shared/models/event.model";
import {EventService} from "../../services/event/event.service";
import {CategoryService} from "../../services/category/category.service";
import {Search_eventModel} from "../../shared/models/search_event.model";
import {environment} from "../../../environments/environment";

export interface EventDialogData {
  latitude: any;
  longitude: any;
  userLocalisation: string;
}

export class SearchEventProps {
  longitude: number;
  latitude: number;
  categoryId: string;
  startDate: Date;
  endDate: Date;
  range: number;
}

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {

  isLocated: boolean;

  postalAddress: string;
  range: FormGroup;
  userLocalisation: string;
  listEventRecherche: Event[];
  longitude: number;
  latitude: number;
  formData: FormGroup;
  searchEventProps: SearchEventProps;

  constructor(public dialog: MatDialog,
              private _eventService: EventService,
              public _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10);
    }
    return value;
  }

  showDialogMapsCollapse(): void {
    const dialogRef = this.dialog.open(EventDialogMapsComponent, {
      width: '1000px',

      data: {userLocalisation: this.userLocalisation}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLocated = true;
      this.longitude = result.longitude;
      this.latitude = result.latitude;
    })
  }

  onclickSubmit() {
    this._eventService.getEventsSearch(this.searchEventProps).subscribe({
      next: () => {

      },
      error: err => {
        if (environment.production) {
          console.error(err)
        }
      }
    })
  }

  private updateData() {
    this.searchEventProps = new SearchEventProps();
    this.getAllCategories()
    this.isLocated = false;

    this.searchEventProps.longitude = 48.79643969643021;
    this.searchEventProps.latitude = 2.128967056048809;
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().subscribe({
      error: err => {
        if (!environment.production) {
          console.error(err)
        }
      }
    })
  }

  private getEventWithRecherche(rechercheEvent: Search_eventModel) {
    this._eventService.searchEvents(rechercheEvent).subscribe(events => {
      this.listEventRecherche = events;
    });
  }
}
