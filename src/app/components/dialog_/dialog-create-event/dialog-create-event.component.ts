import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Event} from "../../../shared/models/event.model";
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/models/user.model";
import {EventService} from "../../../services/event/event.service";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../shared/models/category.model";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {OrganisationMembership} from "../../../shared/models/organisation_membership.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.css']
})
export class DialogCreateEventComponent implements OnInit {

  formData: FormGroup;
  listCategory$: Category[];
  listMembership$: OrganisationMembership[];
  limitParticipant = new FormControl(2, Validators.min(2));
  wrongDate: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogCreateEventComponent>,
              private _eventService: EventService,
              private _categoryService: CategoryService,
              private _organisationService: OrganisationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { userSession: User, organisation: Organisation }) {
  }

  ngOnInit(): void {
    this.initialiseFormGroup();
    this.getAllCategories();
  }

  onClickSubmit(data) {
    if (data.startDateEvent < data.endDateEvent) {

      let newEvent = new Event();
      newEvent.name = data.nameEvent;
      newEvent.startDate = data.startDateEvent;
      newEvent.endDate = data.endDateEvent;
      newEvent.participantsLimit = data.participantsLimitEvent;
      newEvent.category = data.categoryEvent;
      newEvent.user = this.data.userSession;
      newEvent.description = data.descriptionEvent;
      newEvent.organisation = this.data.organisation != null ? this.data.organisation : null;

      // TODO : convertir address en coordonées gps et gestion fichier
      // updateEvent.picture = data.pictureFile;
      newEvent.latitude = 100.11;
      newEvent.longitude = 100.12;
      console.log(newEvent)
      this._eventService.postEvent(newEvent).subscribe({

        next: () => {
          this.dialogRef.close()
        },
        error: err => {
          if (!environment.production) {
            console.log(err);
          }
        }
      });
    } else {
      this._snackBar.open('Problème avec le choix des dates', 'Fermer', {
        duration: 3000
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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
}
