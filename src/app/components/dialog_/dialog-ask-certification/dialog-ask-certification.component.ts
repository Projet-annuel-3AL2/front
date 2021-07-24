import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CertificationService} from "../../../services/certification/certification.service";
import {environment} from "../../../../environments/environment";
import {CertificationRequest} from "../../../shared/models/certification_request.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-ask-certification',
  templateUrl: './dialog-ask-certification.component.html',
  styleUrls: ['./dialog-ask-certification.component.css']
})
export class DialogAskCertificationComponent implements OnInit {
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAskCertificationComponent>,
              private _certificationService: CertificationService,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { user: string }) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  onClickSubmit() {
    if (this.formGroup.valid){
      let certificationRequest = new CertificationRequest();
      certificationRequest.comment = this.formGroup.value.comment;
      this._certificationService.postCertification(certificationRequest).subscribe({
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initializeFormGroup() {
    this.formGroup = this._formBuilder.group({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ])
    })
  }
}
