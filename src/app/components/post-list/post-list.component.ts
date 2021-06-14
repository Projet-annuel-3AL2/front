import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input('listPost') posts$ : Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }


}
