import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EventDialogMapsComponent} from "../dialog_/event-dialog-maps/event-dialog-maps.component";
import {Event} from "../../shared/models/event.model";
import {EventService} from "../../services/event/event.service";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../shared/models/category.model";
import {faMapMarked} from "@fortawesome/free-solid-svg-icons"

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
  categories: Category[];
  isLocated: boolean;
  faMapMarked = faMapMarked;
  postalAddress: string;
  range: FormGroup;
  userLocalisation: string;
  @Output("events")
  foundEvents: EventEmitter<Event[]>;
  longitude: number;
  latitude: number;
  formData: FormGroup;
  searchEventProps: SearchEventProps;

  constructor(public dialog: MatDialog,
              private _eventService: EventService,
              public _categoryService: CategoryService) {
    this.foundEvents = new EventEmitter<Event[]>();
  }

  ngOnInit(): void {
    this.onclickSubmit()
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
    this._eventService.getEventsSearch(this.searchEventProps)
      .toPromise()
      .then(events => this.foundEvents.emit(events));
  }

  private updateData() {
    this.searchEventProps = new SearchEventProps();
    this.getAllCategories();
    this.isLocated = false;
    //TODO
    this.searchEventProps.longitude = 48.79643969643021;
    this.searchEventProps.latitude = 2.128967056048809;
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().toPromise().then(categories => this.categories = categories);
  }
}
