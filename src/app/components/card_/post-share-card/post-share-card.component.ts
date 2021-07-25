import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/models/post.model";
import {faCheckCircle, faShare} from '@fortawesome/free-solid-svg-icons';
import {MediaService} from "../../../services/media/media.service";

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

  constructor(private _mediaService: MediaService) {
  }

  ngOnInit(): void {
    this._mediaService.getPostMedias(this.post.id)
      .toPromise().then(medias => this.post.medias = medias);
  }

}
