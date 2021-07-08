import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  updatedProfilPicture: any;
  updatedBannerPicture: any;

  constructor(public dialogRef: MatDialogRef<DialogUpdateOrganisationComponent>,
              private _organisationService: OrganisationService,
              @Inject(MAT_DIALOG_DATA) public data: { organisation: Organisation, userSession: User }) {
  }

  ngOnInit(): void {
    this.initialiseFormGroup();
    this.updateOrganisation = this.data.organisation
  }

  onClickSubmit(data) {
    let updateOrganisation: Organisation = new Organisation();
    updateOrganisation.name = data.name;
    // TODO : implémenter l'ajout de fichier
    // updateOrganisation.profilePicture = data.profilPicture;
    // updateOrganisation.bannerPicture = data.bannerPicture;

    this._organisationService.putOrganisation(this.data.organisation.id, updateOrganisation).subscribe(
      {
        next: () => {
          this.dialogRef.close()
        },
        error: err => {
          if (!environment.production) {
            console.log(err);
          }
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initialiseFormGroup() {
    this.formData = new FormGroup({
      name: new FormControl(),
      profilPicture: new FormControl(),
      bannerPicture: new FormControl()
    });
  }

  onProfilePictureSelected() {
    const inputNode: any = document.querySelector('#profilePicture');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.updatedProfilPicture = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  onProfileBannerSelected() {
    const inputNode: any = document.querySelector('#profileBanner');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.updatedBannerPicture = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }
}
