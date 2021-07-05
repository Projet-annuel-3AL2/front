import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post: Post;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;

  constructor(private _postService: PostService,
              public dialogReport: MatDialog) {
  }

  ngOnInit(): void {
    // this.getCommentLikeShared();
  }

  // private getCommentLikeShared() {
  //   this._postService.getPostInfos(this.post.id).subscribe({
  //     next: post => {
  //       this.post.sharedPosts = post.sharedPosts;
  //       this.post.likes = post.likes;
  //       this.post.comments = post.comments;
  //     },
  //     error: error => {
  //       if (!environment.production) {
  //         console.error('Error: ', error);
  //       }
  //     }
  //   })
  // }
  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.post.id, reportType: ReportTypeEnum.POST}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
