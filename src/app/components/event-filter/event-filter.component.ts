import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Event} from "../../shared/models/event.model";
import {EventService} from "../../services/event/event.service";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../shared/models/category.model";
import {Address} from "../../shared/models/address.model";
import {MapService} from "../../services/map/map.service";

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
  address: string;
}

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {
  categories: Category[];
  isLocated: boolean;
  addresses: Address[];
  addressSearchTimeOut: number;
  postalAddress: string;
  range: FormGroup;
  @Output("events")
  foundEvents: EventEmitter<Event[]>;
  longitude: number;
  latitude: number;
  formData: FormGroup;
  searchEventProps: SearchEventProps;

  constructor(public dialog: MatDialog,
              private _eventService: EventService,
              private _mapService: MapService,
              public _categoryService: CategoryService) {
    this.foundEvents = new EventEmitter<Event[]>();
  }

  ngOnInit(): void {
    this.searchEventProps = new SearchEventProps();
    this.onclickSubmit()
    this.updateData();
  }

  formatLabel(value: number) {
    if (value > 0) {
      return Math.round(value / 1000);
    }
    return value;
  }

  onclickSubmit() {
    this._mapService.getAddressInfos(this.searchEventProps.address).toPromise().then(address=>{
      this.searchEventProps.longitude = address.longitude;
      this.searchEventProps.latitude = address.latitude;
      this._eventService.getEventsSearch(this.searchEventProps)
        .toPromise()
        .then(events => this.foundEvents.emit(events));
    });
  }

  private updateData() {
    this.getAllCategories();
    this.isLocated = false;
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().toPromise().then(categories => this.categories = categories);
  }

  searchAddress($event: any) {
    clearTimeout(this.addressSearchTimeOut);
    this.addressSearchTimeOut = setTimeout(() => {
      if ($event.target.value === undefined || $event.target.value === '') {
        this.addresses = undefined;
        return;
      }
      this._mapService.searchAddresses($event.target.value).toPromise().then(addresses => this.addresses = addresses);
    }, 500);
  }

  formatAddress(option: Address):string {
    return [[option.house_number, option.road].join(" "), [option.town, option.postcode].join(" "), option.country].join(", ");
  }
}
