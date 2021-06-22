import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../shared/models/post.model";
import {environment} from "../../../../environments/environment";
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  listPost$: Post[];
  user: User;
  constructor(private postService: PostService,
              private userService: UserService,
              // private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.listPost$ = this.postService.fakeGetRelatedPost('a');
    this.user = this.userService.fakeGetUser('a');
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
    // this.getPosts();
  }

  private getPosts() {
    this.postService.getAllPost().subscribe({
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

  canCreateEvent() {
    if (this.user != undefined){
      return this.user.certification !== undefined;
    }
    return false;
  }

  // TODO : Je sais pas si un user peut avoir ou pas plusieurs organisation
  canCreateOrganisation() {
    if (this.user != undefined){
      return this.user.certification !== undefined;
    }
    return false;
  }
}
