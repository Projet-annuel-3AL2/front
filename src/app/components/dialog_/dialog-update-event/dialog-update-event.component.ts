import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Event} from "../../../shared/models/event.model";
import {CategoryService} from "../../../services/category/category.service";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";
import {MapService} from "../../../services/map/map.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-update-event',
  templateUrl: './dialog-update-event.component.html',
  styleUrls: ['./dialog-update-event.component.css']
})
export class DialogUpdateEventComponent implements OnInit {

  addresses: unknown[];
  addressSearchTimeOut: number;
  formData: FormGroup;
  limitParticipant = new FormControl(2, Validators.min(2));
  postalAddress: any;
  media: File;
  mediaURL: string;
  env: any

  constructor(public dialogRef: MatDialogRef<DialogUpdateEventComponent>,
              public _eventService: EventService,
              private _organisationService: OrganisationService,
              public _categoryService: CategoryService,
              public _authService: AuthService,
              private _formBuilder: FormBuilder,
              private _mapService: MapService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { event: Event }) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.updateData().then()
    this.initialiseFormGroup();
  }

  onClickSubmit() {
    if (this.formData.value.startDate < this.formData.value.endDate) {
      if (this.formData.valid) {
        this._mapService.getAddressInfos(this.postalAddress).subscribe(address => {
          this.formData.value.latitude = address[0].lat;
          this.formData.value.longitude = address[0].lon;

          this._eventService.updateEvent(this.data.event.id, this.formData, this.media).subscribe({
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
      }
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

  private async updateData(): Promise<void> {
    this.getAllCategories();
    this.getCategory();
    this.postalAddress = null;
    this.media = null;

    await this._eventService.event.subscribe(event => {
      this._mapService.getAddressFromLatLng(event.latitude, event.longitude).subscribe( addressT => {
        const address: any = addressT;
        this.postalAddress = `${address?.house_number} ${address?.road}, ${address?.town} ${address?.postcode}, ${address?.country} `
      });
    })
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

  private getCategory() {
    this._eventService.getEventCategory(this.data.event.id).subscribe({
      next: () => {
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  private initialiseFormGroup() {
    this.formData = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]),
      description: new FormControl('', []),
      participantsLimit: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(1000),
        Validators.pattern('^[0-9]*$')
      ]),
      category: new FormControl('', [
        Validators.required
      ]),
      postalAddress: new FormControl('', [
        Validators.required
      ]),
      startDate: new FormControl('', [
        Validators.required
      ]),
      endDate: new FormControl('', [
        Validators.required
      ]),
      picture: new FormControl('',[])
    });


    this.formData.setValue({
      name: this.data.event.name,
      description: this.data.event.description,
      participantsLimit: this.data.event.participantsLimit,
      category: this.data.event.category,
      startDate: this.data.event.startDate,
      endDate: this.data.event.endDate,
      postalAddress: this.postalAddress
    })
  }
}
