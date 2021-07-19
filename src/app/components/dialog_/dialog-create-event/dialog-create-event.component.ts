import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Event} from "../../../shared/models/event.model";
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../../../services/event/event.service";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../shared/models/category.model";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MapService} from "../../../services/map/map.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.css']
})
export class DialogCreateEventComponent implements OnInit {

  addresses: unknown[];
  addressSearchTimeOut: number;
  formData: FormGroup;
  limitParticipant = new FormControl(2, Validators.min(2));
  newEvent: Event;
  postalAddress: any;
  media: File;
  mediaURL: string;

  constructor(public dialogRef: MatDialogRef<DialogCreateEventComponent>,
              private _eventService: EventService,
              public _authService: AuthService,
              public _categoryService: CategoryService,
              private _organisationService: OrganisationService,
              private _snackBar: MatSnackBar,
              private _mapService: MapService,
              @Inject(MAT_DIALOG_DATA) public data: { organisation: Organisation }) {

  }

  ngOnInit(): void {
    this.newEvent = new Event();
    this.newEvent.category = new Category();
    this.media = null;
    this.updateData();
  }

  onClickSubmit() {
    if (this.newEvent.startDate < this.newEvent.endDate) {
      this._mapService.getAddressInfos(this.postalAddress).subscribe(address => {
        this.newEvent.latitude = 48.79643969643021;
        this.newEvent.longitude = 2.128967056048809;
        this._eventService.createEvent(this.newEvent, this.media).subscribe({
          next: () => {
            this.dialogRef.close()
          },
          error: err => {
            if (!environment.production) {
              console.log(err);
            }
          }
        });
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

  searchAddress($event: any) {
    clearTimeout(this.addressSearchTimeOut);
    this.addressSearchTimeOut = setTimeout(() => {
      if ($event.target.value === undefined || $event.target.value === '') {
        this.addresses = undefined;
        return;
      }
      this._mapService.searchAddresses($event.target.value).subscribe(addresses => this.addresses = addresses);
    }, 500);
  }

  onPictureSelected() {

    const inputNode: any = document.querySelector('#picture');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (e: any) => {
        const file: string = e.target.result
        if (file.match(/image\/*/) === null) {
          console.log('invalid file input');
          return;
        }
        if (typeof file === "string") {
          this.mediaURL = file;
          this.media = inputNode.files[0];
        }
      };
    }
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().subscribe({
      next: () => {
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  private async updateData(): Promise<void> {
    this.getAllCategories();
    this.postalAddress = null;
    await this._authService.user.subscribe(user => {
      this.newEvent.user = user;
    });
    this.newEvent.organisation = this.data.organisation != null ? this.data.organisation : null;
  }
}
