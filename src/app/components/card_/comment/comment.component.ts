import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../shared/models/comment.model";
import {CommentService} from "../../../services/comment/comment.service";
import {AuthService} from "../../../services/auth/auth.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: Comment;
  faEllipsisH = faEllipsisH;

  constructor(public _authService: AuthService,
              private _commentService: CommentService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deleteComment() {
    this._commentService.deleteComment(this.comment.id)
      .subscribe();
  }

  showDialogReport() {
    const dialogRef = this.matDialog.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.comment.id, reportType: ReportTypeEnum.COMMENT}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
