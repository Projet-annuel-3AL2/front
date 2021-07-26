import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Event} from "../../../shared/models/event.model";
import {CategoryService} from "../../../services/category/category.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MapService} from "../../../services/map/map.service";
import {Category} from "../../../shared/models/category.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Address} from "../../../shared/models/address.model";

@Component({
  selector: 'app-dialog-update-event',
  templateUrl: './dialog-update-event.component.html',
  styleUrls: ['./dialog-update-event.component.css']
})
export class DialogUpdateEventComponent implements OnInit {
  categories: Category[];
  addresses: Address[];
  addressSearchTimeOut: number;
  formData: FormGroup;
  limitParticipant = new FormControl(2, Validators.min(2));
  postalAddress: string;
  media: File;
  mediaURL: string;

  constructor(public dialogRef: MatDialogRef<DialogUpdateEventComponent>,
              public _eventService: EventService,
              private _organisationService: OrganisationService,
              public _categoryService: CategoryService,
              public _authService: AuthService,
              private _formBuilder: FormBuilder,
              private _mapService: MapService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { event: Event }) {
  }

  ngOnInit(): void {
    this.updateData().then()
    this.initialiseFormGroup();
  }

  onClickSubmit() {
    if (this.formData.value.startDate > this.formData.value.endDate) {
      this._snackBar.open('La date de début doit précéder la date de fin prévue', 'Fermer', {
        duration: 3000
      });
      return;
    }
    this._mapService.getAddressInfos(this.formData.value.postalAddress).toPromise().then(address => {
      this.formData.value.latitude = address.latitude;
      this.formData.value.longitude = address.longitude;
      this._eventService.updateEvent(this.data.event.id, this.formData, this.media)
        .toPromise()
        .then(() => this.dialogRef.close())
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
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().toPromise().then(categories => this.categories = categories);
  }

  private getCategory() {
    this._eventService.getCategory(this.data.event.id).toPromise().then();
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


    this.formData.patchValue({
      name: this.data.event.name,
      description: this.data.event.description,
      participantsLimit: this.data.event.participantsLimit,
      category: this.data.event.category,
      startDate: this.data.event.startDate,
      endDate: this.data.event.endDate
    })
  }

  formatAddress(option: Address):string {
    return [[option.house_number, option.road].join(" "), [option.town, option.postcode].join(" "), option.country].join(", ");
  }
}
