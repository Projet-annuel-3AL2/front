import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../shared/models/post.model";
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

  listPost$: Post[] = [];
  userSession: User;

  constructor(private _postService: PostService,
              private _userService: UserService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession=user;
      this.getTimeline();
    });

  }

  private getTimeline() {
    this._postService.getTimeline(this.userSession.id).subscribe({
      next: posts => {
        this.listPost$ = posts;
      },
      error: error => {
        if (!environment.production){
          console.error('Error: ', error);
        }
      }
    })
  }
}
