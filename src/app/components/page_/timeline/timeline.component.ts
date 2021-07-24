import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
  offset: number = 0;
  limit: number = 20;
  posts: Post[];

  constructor(public _postService: PostService,
              private _userService: UserService,
              private _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Accueil - " + environment.name);
  }

  ngOnInit(): void {
    this._postService.getTimeline()
      .toPromise()
      .then(posts => this.posts = posts);
  }

  removePost($event: Post) {
    this.posts = this.posts.filter(post=>post.id !== $event.id);
  }

  ngOnDestroy(): void {
  }
}
