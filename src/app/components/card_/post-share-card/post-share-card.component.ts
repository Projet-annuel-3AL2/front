import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {faCheckCircle, faShare} from '@fortawesome/free-solid-svg-icons';
import {MediaService} from "../../../services/media/media.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-post-share-card',
  templateUrl: './post-share-card.component.html',
  styleUrls: ['./post-share-card.component.css']
})
export class PostShareCardComponent implements OnInit {
  @Input()
  post: Post;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  env: unknown;

  constructor(private _mediaService: MediaService) {
    this.env = environment;
  }

  ngOnInit(): void {
    this._mediaService.getPostMedias(this.post.id)
      .subscribe(medias => this.post.medias = medias);
  }

}
