import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-event-accueil',
  templateUrl: './event-accueil.component.html',
  styleUrls: ['./event-accueil.component.css']
})
export class EventAccueilComponent implements OnInit {

  @Input('event') event : Event = new Event();

  posts$: Post[];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getRelatedPosts();
  }

  private getRelatedPosts() {
    this.posts$ = this.postService.getRelatedPost(this.event.id);
  }
}
