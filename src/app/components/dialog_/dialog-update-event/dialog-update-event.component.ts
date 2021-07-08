import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
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

  formData: NgForm;
  listCategory$: Category[];
  postalAddress: string;
  updatedPicture: any;
  updateEvent: Event;
  constructor(public dialogRef: MatDialogRef<DialogUpdateEventComponent>,
              private _eventService: EventService,
              private _organisationService: OrganisationService,
              private _categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: { event: Event, userSession: User }) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.updateEvent = this.data.event;
    this.postalAddress = null;
  }

  onClickSubmit(data: NgForm) {


    // TODO : convertir address en coordonées gps et gestion fichier
    // updateEvent.picture = data.pictureFile;
    // updateEvent.latitude = data.latitudeEvent;
    // updateEvent.longitude = data.longitudeEvent;
    console.log(this.updateEvent)
    console.log(this.updatedPicture)
    this._eventService.putEvent(this.updateEvent).subscribe({

      next: () => {
        this.dialogRef.close()
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
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
    const inputNode: any = document.querySelector('#picture');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.updatedPicture = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }
}
