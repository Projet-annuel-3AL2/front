import {Component, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {PostService} from "../../services/post/post.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getTimeline().subscribe(posts => this.posts = posts);
  }

}
