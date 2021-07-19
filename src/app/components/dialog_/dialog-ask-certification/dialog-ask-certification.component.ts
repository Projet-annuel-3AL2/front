import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CertificationService} from "../../../services/certification/certification.service";
import {environment} from "../../../../environments/environment";
import {CertificationRequest} from "../../../shared/models/certification_request.model";

@Component({
  selector: 'app-dialog-ask-certification',
  templateUrl: './dialog-ask-certification.component.html',
  styleUrls: ['./dialog-ask-certification.component.css']
})
export class DialogAskCertificationComponent implements OnInit {
  certificationRequest: CertificationRequest;

  constructor(public dialogRef: MatDialogRef<DialogAskCertificationComponent>,
              private _certificationService: CertificationService,
              @Inject(MAT_DIALOG_DATA) public data: { user: string }) {
  }

  ngOnInit(): void {
    this.certificationRequest = new CertificationRequest();
  }

  onClickSubmit() {
    this._certificationService.postCertification(this.certificationRequest).subscribe({
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
