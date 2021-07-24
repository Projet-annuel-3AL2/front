import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Report} from "../../../shared/models/report.model";
import {PostService} from "../../../services/post/post.service";
import {EventService} from "../../../services/event/event.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {GroupService} from "../../../services/group/group.service";
import {environment} from "../../../../environments/environment";
import {CommentService} from "../../../services/comment/comment.service";

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
              private _commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: { id: string, reportType: ReportTypeEnum }) {
  }

  ngOnInit(): void {
    this.initialiseFormReport();
  }

  onClickSubmit(formData) {
    if (this.formData.valid){
      let newReport: Report = new Report();
      newReport.text = formData.text;

      if (this.data.reportType === ReportTypeEnum.USER) {
        this._userService.sendReport(this.data.id, newReport).subscribe({
          next: () => {
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
          next: () => {
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
          next: () => {
            this.dialogRef.close()
          },
          error: error => {
            if (!environment.production) {
              console.error('Error: ', error);
            }
          }
        });

      } else if (this.data.reportType === ReportTypeEnum.GROUP) {

        this._groupService.sendReport(this.data.id, newReport).subscribe({
          next: () => {
            this.dialogRef.close()
          },
          error: error => {
            if (!environment.production) {
              console.error('Error: ', error);
            }
          }
        })

      } else if (this.data.reportType === ReportTypeEnum.EVENT) {

        this._eventService.reportEvent(this.data.id, newReport).subscribe({
          next: () => {
            this.dialogRef.close()
          },
          error: error => {
            if (!environment.production) {
              console.error('Error: ', error);
            }
          }
        })

      } else if (this.data.reportType === ReportTypeEnum.COMMENT) {
        this._commentService.sendReport(this.data.id, newReport).subscribe({
          next: () => {
            this.dialogRef.close()
          }
        });
      }
      this.dialogRef.close()
    }
  }

  private initialiseFormReport() {
    this.formData = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500)
      ])
    })
  }
}
