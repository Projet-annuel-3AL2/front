import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  limitParticipant = new FormControl(2, Validators.min(2));
  postalAddress: any;
  media: File;
  mediaURL: string;
  newEventForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogCreateEventComponent>,
              private _eventService: EventService,
              public _authService: AuthService,
              public _categoryService: CategoryService,
              private _organisationService: OrganisationService,
              private _snackBar: MatSnackBar,
              private _mapService: MapService,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { organisation: Organisation }) {

  }

  ngOnInit(): void {
    this.media = null;
    this.updateData();
    this.initializeFormGroup();
  }

  onClickSubmit() {
    if (this.newEventForm.value.startDate < this.newEventForm.value.endDate) {
      this.isSubmitted = true;
      if(this.newEventForm.valid){
        this._mapService.getAddressInfos(this.newEventForm.value.postalAddress).subscribe(address => {
          this._eventService.createEvent(this.newEventForm, this.media, address[0].lat, address[0].lon, this.data?.organisation).subscribe({
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
  }

  private initializeFormGroup() {
    this.newEventForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]),
      description: new FormControl('', []),
      participationLimit: new FormControl('', [
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
    })
  }
}
