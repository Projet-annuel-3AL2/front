import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
  userSession: User;
  offset: number = 0;
  limit: number = 20;

  constructor(public _postService: PostService,
              private _userService: UserService,
              private _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Accueil - " + environment.name);
  }

  ngOnInit(): void {
    this._postService.getTimeline().subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  ngOnDestroy(): void {
  }
}
