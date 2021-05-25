import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../shared/models/post.model";
import {faCheckCircle, faComment, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
