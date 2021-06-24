import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../../services/post/post.service";
import {delay, repeat} from "rxjs/operators";

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

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.updatePost();
    this.postService.getPostLikes(this.post.id)
      .pipe(delay(3000), repeat())
      .subscribe(likes=> this.post.likes = likes);
    this.postService.isPostLiked(this.post.id)
      .pipe(delay(3000), repeat())
      .subscribe(isLiked=> this.post.isLiked = isLiked);
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
