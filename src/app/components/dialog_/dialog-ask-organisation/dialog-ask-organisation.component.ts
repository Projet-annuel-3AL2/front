import {Component, Inject, OnInit} from '@angular/core';
import {OrganisationRequest} from "../../../shared/models/organisation_request.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {User} from "../../../shared/models/user.model";
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-ask-organisation',
  templateUrl: './dialog-ask-organisation.component.html',
  styleUrls: ['./dialog-ask-organisation.component.css']
})
export class DialogAskOrganisationComponent implements OnInit {
  formGroup: FormGroup

  constructor(public dialogRef: MatDialogRef<DialogAskOrganisationComponent>,
              private _organisationService: OrganisationService,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
  }

  ngOnInit(): void {
    this.initialiseFormGroup()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    if (this.formGroup.valid){
      const organisationRequest = new OrganisationRequest();
      organisationRequest.comment = this.formGroup.value.comment;
      organisationRequest.name = this.formGroup.value.name;
      this._organisationService.postOrganisationRequest(organisationRequest).subscribe({
        next: () => {
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      });
    }

  }

  private initialiseFormGroup() {
    this.formGroup = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500)
      ])
    })
  }
}
