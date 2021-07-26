import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {take} from "rxjs/operators";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  @Output()
  onDelete: EventEmitter<Post> = new EventEmitter();
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  text: string;
  private timeSubscription: Subscription;

  constructor(private _postService: PostService,
              public _authService: AuthService,
              private _mediaService: MediaService,
              public matDialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this._postService.sharedPost(this.post.id).toPromise().then(post => this.post.sharesPost = post);
    this._mediaService.getPostMedias(this.post.id).toPromise().then(medias => this.post.medias = medias);
    this.updatePost();
    this.timeSubscription = timer(0, 15000)
      .subscribe(() => this.updatePost());
  }

  updatePost(): void {
    this._postService.getPostLikes(this.post.id)
      .toPromise().then(likes => this.post.likes = likes);
    this._postService.isPostLiked(this.post.id)
      .toPromise().then(isLiked => this.post.isLiked = isLiked);
  }


  showDialogReport() {
    this.matDialog.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.post.id, reportType: ReportTypeEnum.POST}
    });
  }

  deletePost() {
    this._postService.deletePost(this.post.id)
      .toPromise()
      .then(() => this.onDelete.emit(this.post));
  }

  likePost() {
    this._postService.likePost(this.post.id)
      .toPromise()
      .then(() => {
        this.post.isLiked = true;
        this._authService.user
          .pipe(take(1))
          .toPromise()
          .then(user=>this.post.likes.push(user));
      });
  }

  dislikePost() {
    this._postService.dislikePost(this.post.id)
      .toPromise()
      .then(() => {
        this.post.isLiked = false;
        this._authService.user
          .pipe(take(1))
          .toPromise()
          .then(user=>this.post.likes = this.post.likes.filter(user1=>user1.id !== user.id));
      });
  }

  sharePost() {
    this.matDialog.open(DialogCreatePostComponent, {
      minWidth: "500px",
      minHeight: "121px",
      data: {sharesPost: this.post}
    });
  }
}
