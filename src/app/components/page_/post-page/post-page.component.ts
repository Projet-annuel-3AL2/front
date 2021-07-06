import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: Post;
  constructor(private _activatedRoute:ActivatedRoute,
              private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getPostById(this._activatedRoute.snapshot.paramMap.get("postId"))
      .subscribe(post=> {
        this.post = post;
      });
  }

}
