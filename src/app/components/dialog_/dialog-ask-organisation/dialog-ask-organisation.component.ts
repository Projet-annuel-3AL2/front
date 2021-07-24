import {Component, Inject, OnInit} from '@angular/core';
import {OrganisationRequest} from "../../../shared/models/organisation_request.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-dialog-ask-organisation',
  templateUrl: './dialog-ask-organisation.component.html',
  styleUrls: ['./dialog-ask-organisation.component.css']
})
export class DialogAskOrganisationComponent implements OnInit {
  organisationRequest: OrganisationRequest;

  constructor(public dialogRef: MatDialogRef<DialogAskOrganisationComponent>,
              private _organisationService: OrganisationService,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
  }

  ngOnInit(): void {
    this.organisationRequest = new OrganisationRequest();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this._organisationService.postOrganisationRequest(this.organisationRequest)
      .toPromise()
      .then(() => this.dialogRef.close());
  }
}
