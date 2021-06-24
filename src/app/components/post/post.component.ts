import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../services/post/post.service";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  @Input('post') post: Post = new Post();
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  private timeSubscription: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.updatePost();
    this.timeSubscription = timer(0,3000)
      .subscribe(()=> this.updatePost());
  }

  updatePost(): void{
    this.postService.getPostLikes(this.post.id)
      .subscribe(likes=> this.post.likes = likes);
    this.postService.isPostLiked(this.post.id)
      .subscribe(isLiked=> this.post.isLiked = isLiked);
  }

  likePost() {
    this.postService.likePost(this.post.id)
      .subscribe(()=>this.updatePost());
  }

  dislikePost(){
    this.postService.dislikePost(this.post.id)
      .subscribe(()=>this.updatePost());
  }
}
