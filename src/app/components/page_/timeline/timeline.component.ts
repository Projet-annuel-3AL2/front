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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.listPost$ = this.postService.fakeGetRelatedPost('a');
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
}
