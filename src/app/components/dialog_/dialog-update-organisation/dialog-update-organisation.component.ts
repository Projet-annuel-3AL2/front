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
  constructor(public dialogRef: MatDialogRef<DialogUpdateOrganisationComponent>,
              private _organisationService: OrganisationService,
              @Inject(MAT_DIALOG_DATA) public data: {organisation: Organisation, userSession: User}) { }

  ngOnInit(): void {
    this.initialiseFormGroup();
    this.updateOrganisation = this.data.organisation
  }

  private initialiseFormGroup() {
    this.formData = new FormGroup({
      name: new FormControl(),
      profilPicture: new FormControl(),
      bannerPicture: new FormControl()
    });
  }

  onClickSubmit(data) {
    let updateOrganisation: Organisation = new Organisation();
    updateOrganisation.name = data.name;
    // TODO : implémenter l'ajout de fichier
    // updateOrganisation.profilePicture = data.profilPicture;
    // updateOrganisation.bannerPicture = data.bannerPicture;
    console.log(updateOrganisation);
    this._organisationService.putOrganisation(this.data.organisation.id, updateOrganisation).subscribe(
      {
        next: () => {
          this.dialogRef.close()
        },
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
