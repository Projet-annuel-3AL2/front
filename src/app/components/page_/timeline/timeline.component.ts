import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  userSession: User;
  offset:number=0;
  limit:number=20;

  constructor(public _postService: PostService,
              private _userService: UserService,
              private _authService: AuthService) {
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
}
