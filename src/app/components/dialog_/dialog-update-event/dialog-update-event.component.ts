import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Event} from "../../../shared/models/event.model";
import {CategoryService} from "../../../services/category/category.service";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";
import {MapService} from "../../../services/map/map.service";
import {Category} from "../../../shared/models/category.model";

@Component({
  selector: 'app-dialog-update-event',
  templateUrl: './dialog-update-event.component.html',
  styleUrls: ['./dialog-update-event.component.css']
})
export class DialogUpdateEventComponent implements OnInit {
  categories: Category[];
  addresses: unknown[];
  addressSearchTimeOut: number;
  formData: FormGroup;
  limitParticipant = new FormControl(2, Validators.min(2));
  updateEvent: Event;
  postalAddress: any;
  media: File;
  mediaURL: string;
  env: any

  constructor(public dialogRef: MatDialogRef<DialogUpdateEventComponent>,
              public _eventService: EventService,
              private _organisationService: OrganisationService,
              public _categoryService: CategoryService,
              public _authService: AuthService,
              private _mapService: MapService,
              @Inject(MAT_DIALOG_DATA) public data: { event: Event }) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.updateData()

  }

  onClickSubmit() {
    this._eventService.updateEvent(this.updateEvent).subscribe({

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

  private async updateData(): Promise<void> {
    this.getAllCategories();
    this.getCategory();
    this.postalAddress = null;
    this.media = null;
    this.updateEvent.organisation = this.data.event.organisation != null ? this.data.event.organisation : null;
    await this._authService.user.subscribe(user => {
      this.updateEvent.user = user;
    });
    this._eventService.getEventById(this.data.event.id).toPromise().then(event => this.updateEvent=event);
    this.postalAddress = null;
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().toPromise().then(categories=>this.categories=categories);
  }

  private getCategory() {
    this._eventService.getCategory(this.data.event.id).toPromise().then();
  }

}
