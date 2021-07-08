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
  limitParticipant = new FormControl(2, Validators.min(2));
  updatedPicture: any;
  newEvent: Event;
  postalAddress: string;

  constructor(public dialogRef: MatDialogRef<DialogCreateEventComponent>,
              private _eventService: EventService,
              private _categoryService: CategoryService,
              private _organisationService: OrganisationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { userSession: User, organisation: Organisation }) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.newEvent = new Event();
  }

  onClickSubmit(data) {
    if (this.newEvent.startDate < this.newEvent.endDate) {

      this.newEvent.user = this.data.userSession;
      this.newEvent.organisation = this.data.organisation != null ? this.data.organisation : null;

      // TODO : convertir address en coordonées gps et gestion fichier
      // updateEvent.picture = data.pictureFile;
      this.newEvent.latitude = 100;
      this.newEvent.longitude = 100;

      console.log(this.newEvent)
      this._eventService.postEvent(this.newEvent).subscribe({

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

  onPictureSelected() {

  }
}
