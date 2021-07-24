import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-update-organisation',
  templateUrl: './dialog-update-organisation.component.html',
  styleUrls: ['./dialog-update-organisation.component.css']
})
export class DialogUpdateOrganisationComponent implements OnInit {

  formData: FormGroup;
  updateOrganisation: Organisation;
  updatedProfilePicture: any;
  updatedBannerPicture: any;
  updatedProfilePictureURL: any;
  updatedBannerPictureURL: any;
  env: any;

  constructor(public dialogRef: MatDialogRef<DialogUpdateOrganisationComponent>,
              private _organisationService: OrganisationService,
              @Inject(MAT_DIALOG_DATA) public data: { organisation: Organisation, userSession: User }) {
    this.env = environment
  }

  ngOnInit(): void {
    this.updateOrganisation = this.data.organisation;
    this.updatedProfilePicture = null;
    this.updatedBannerPicture = null;
  }

  onClickSubmit() {
    this._organisationService.putOrganisation(this.updateOrganisation, this.updatedProfilePicture, this.updatedBannerPicture)
      .toPromise()
      .then(() => this.dialogRef.close());
  }

  onProfilePictureSelected() {
    const inputNode: any = document.querySelector('#profilePicture');
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
          this.updatedProfilePictureURL = file;
          this.updatedProfilePicture = inputNode.files[0];
        }
      };
    }
  }

  onProfileBannerSelected() {
    const inputNode: any = document.querySelector('#profileBanner');
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
          this.updatedBannerPictureURL = file;
          this.updatedBannerPicture = inputNode.files[0];
        }
      };
    }
  }
}
