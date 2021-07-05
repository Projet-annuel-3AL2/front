import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/user.model";
import {Report} from "../../../shared/models/report.model";
import {PostService} from "../../../services/post/post.service";
import {EventService} from "../../../services/event/event.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {GroupService} from "../../../services/group/group.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css']
})
export class DialogReportComponent implements OnInit {
  formData: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogReportComponent>,
              private _userService: UserService,
              private _postService: PostService,
              private _eventService: EventService,
              private _organisationService: OrganisationService,
              private _groupService: GroupService,
              @Inject(MAT_DIALOG_DATA) public data: {id: string, reportType: ReportTypeEnum}) { }

  ngOnInit(): void {
    this.initialiseFormReport();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initialiseFormReport() {
    this.formData = new FormGroup({
      text: new FormControl()
    })
  }


  onClickSubmit(formData) {
    let newReport: Report = new Report();
    newReport.text = formData.text;

    if (this.data.reportType === ReportTypeEnum.USER) {
      console.log(newReport)
      this._userService.sendReport(this.data.id, newReport).subscribe({
        next: () =>{
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      })

    } else if (this.data.reportType === ReportTypeEnum.POST) {

      this._postService.sendReport(this.data.id, newReport).subscribe({
        next: () =>{
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      });

    } else if (this.data.reportType === ReportTypeEnum.ORGANISATION) {

      this._organisationService.sendReport(this.data.id, newReport).subscribe({
        next: () =>{
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      });

    }else if (this.data.reportType === ReportTypeEnum.GROUP) {

      this._groupService.sendReport(this.data.id, newReport).subscribe({
        next: () =>{
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      })

    }else if (this.data.reportType === ReportTypeEnum.EVENT) {

      this._eventService.sendReport(this.data.id, newReport).subscribe({
        next: () =>{
          this.dialogRef.close()
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
      })

    }
    this.dialogRef.close()
  }
}
