import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {Event} from "../../../shared/models/event.model";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../shared/models/category.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-update-event',
  templateUrl: './dialog-update-event.component.html',
  styleUrls: ['./dialog-update-event.component.css']
})
export class DialogUpdateEventComponent implements OnInit {

  formData: FormGroup;
  listOrganisation$: Organisation[];
  limitParticipant =  new FormControl(2, Validators.min(2));
  listCategory$: Category[];

  constructor(public dialogRef: MatDialogRef<DialogUpdateEventComponent>,
              private _eventService: EventService,
              private _organisationService: OrganisationService,
              private _categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: {event: Event, userSession: User}) { }

  ngOnInit(): void {
    this.initialiseFormGroup();
    this.getAllCategories();
  }

  private getListOrganisation() {
    this._organisationService.getAllOrgaWhereUserCanCreateEvent(this.data.userSession.id).subscribe(organisations => {
      this.listOrganisation$ = organisations
    })
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().subscribe(categories => {
      this.listCategory$ = categories
    })
  }

  private initialiseFormGroup() {
    this.formData = new FormGroup({
      nameEvent: new FormControl(),
      descriptionEvent: new FormControl(),
      startDateEvent: new FormControl(),
      endDateEvent: new FormControl(),
      address: new FormControl(),
      participantsLimitEvent: new FormControl(),
      categoryEvent: new FormControl(),
      pictureFile: new FormControl(),
      organisationEvent: new FormControl(),
    });
  }

  onClickSubmit(data) {
    let updateEvent = new Event();
    updateEvent.id = this.data.event.id;
    updateEvent.name = data.nameEvent;
    updateEvent.startDate = data.startDateEvent;
    updateEvent.endDate = data.endDateEvent;
    updateEvent.participantsLimit = data.participantsLimitEvent;
    updateEvent.category = data.categoryEvent;
    updateEvent.user = this.data.userSession;
    updateEvent.description = data.descriptionEvent;


    // TODO : convertir address en coordonées gps et gestion fichier
    // updateEvent.picture = data.pictureFile;
    // updateEvent.latitude = data.latitudeEvent;
    // updateEvent.longitude = data.longitudeEvent;

    console.log(updateEvent);

    this._eventService.putEvent(updateEvent).subscribe({

        next: () => {
          this.dialogRef.close()
        },
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
