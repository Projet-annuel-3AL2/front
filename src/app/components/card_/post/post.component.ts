import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../../services/post/post.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {Subscription, timer} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post: Post = new Post();
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  text: string;
  private timeSubscription: Subscription;

  constructor(private _postService: PostService,
              public _authService: AuthService,
              public dialogReport: MatDialog) {
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.updatePost();
    this.timeSubscription = timer(0, 15000)
      .subscribe(() => this.updatePost());
  }

  updatePost(): void {
    this._postService.getPostLikes(this.post.id)
      .subscribe(likes => this.post.likes = likes);
    this._postService.isPostLiked(this.post.id)
      .subscribe(isLiked => this.post.isLiked = isLiked);
  }


  showDialogReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.post.id, reportType: ReportTypeEnum.POST}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deletePost(){
    this._postService.deletePost(this.post.id)
      .subscribe();
  }

  likePost() {
    this._postService.likePost(this.post.id)
      .subscribe(() => this.updatePost());
  }

  dislikePost() {
    this._postService.dislikePost(this.post.id)
      .subscribe(() => this.updatePost());
  }
}
