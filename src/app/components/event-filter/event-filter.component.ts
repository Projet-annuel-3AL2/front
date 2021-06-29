import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EventDialogMapsComponent} from "../dialog_/event-dialog-maps/event-dialog-maps.component";
import {Event} from "../../shared/models/event.model";
import {EventService} from "../../services/event/event.service";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../shared/models/category.model";
import {RechercheEventModel} from "../../shared/models/rechercheEvent.model";

export interface EventDialogData {
  latitude: any;
  longitude: any;
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
  listCategories$: Category[];
  userLocalisation: string;
  listEventRecherche: Event[];
  longitude: number;
  latitude: number;
  formData: FormGroup;

  constructor(public dialog: MatDialog,
              private _eventService: EventService,
              private _categoryService: CategoryService) { }

  ngOnInit(): void {

    this.isLocated = false;
    this.initializeFormGroup();

    this.getAllCategories()
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) ;
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

  private getAllCategories() {
    this._categoryService.getAllCategory().subscribe(data => {
      this.listCategories$ = data;
    })
  }

  private initializeFormGroup() {
    this.formData = new FormGroup( {
      latitude: new FormControl(),
      longitude: new FormControl(),
      category: new FormControl(),
      endDate: new FormControl(),
      startDate: new FormControl(),
      range: new FormControl()
    })
  }

  onclickSubmit(data) {
    const rechercheEvent = new RechercheEventModel();
    rechercheEvent.latitude = data.latitude;
    rechercheEvent.longitude = data.longitude;
    rechercheEvent.category = data.category;
    rechercheEvent.endDate = data.endDate;
    rechercheEvent.startDate = data.startDate;
    rechercheEvent.range = data.range;
    console.log(rechercheEvent);
    // this.getEventWithRecherche(rechercheEvent);
  }

  // TODO : Revoir la fonctionnalité du filter pour envoyer le résultat de la recherche dans une un autre component
  private getEventWithRecherche(rechercheEvent: RechercheEventModel) {
    this._eventService.getEventWithRecherche(rechercheEvent).subscribe(events => {
      this.listEventRecherche = events;
    });
  }
}
