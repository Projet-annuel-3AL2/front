import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../../services/post/post.service";
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/ReportType.enum";
import {MatDialog} from "@angular/material/dialog";
import {Subscription, timer} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";
import {DialogCreatePostComponent} from "../../dialog_/dialog-create-post/dialog-create-post.component";
import {MediaService} from "../../../services/media/media.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  text: string;
  env: unknown;
  private timeSubscription: Subscription;

  constructor(private _postService: PostService,
              public _authService: AuthService,
              private _mediaService: MediaService,
              public matDialog: MatDialog) {
    this.env = environment;
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this._postService.sharedPost(this.post.id)
      .subscribe(post => this.post.sharesPost = post);
    this._mediaService.getPostMedias(this.post.id)
      .subscribe(medias => this.post.medias = medias);
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
    const dialogRef = this.matDialog.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.post.id, reportType: ReportTypeEnum.POST}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deletePost() {
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

  sharePost() {
    this.matDialog.open(DialogCreatePostComponent, {
      minWidth: "500px",
      minHeight: "121px",
      data: {sharesPost: this.post}
    });
  }
}
