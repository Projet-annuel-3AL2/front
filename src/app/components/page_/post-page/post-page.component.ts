import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {Comment} from "../../../shared/models/comment.model";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: Post;
  comments: Comment[];
  constructor(private _activatedRoute:ActivatedRoute,
              private _postService: PostService,
              public _userService: UserService,
              public _authService: AuthService) { }

  ngOnInit(): void {
    this.update();
  }

 update(): void {
   this._postService.getPostById(this._activatedRoute.snapshot.paramMap.get("postId"))
     .subscribe(post=> {
       this.post = post;
     });
   this._postService.getComments(this._activatedRoute.snapshot.paramMap.get("postId"))
     .subscribe(comments=> {
       this.comments = comments;
     });
 }
}
