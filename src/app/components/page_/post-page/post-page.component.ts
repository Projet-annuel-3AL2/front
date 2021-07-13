import {Component, OnInit} from '@angular/core';
import {faCalendarAlt, faImage, faPaperPlane, faSmile, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {Comment} from "../../../shared/models/comment.model";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post: Post;
  comments: Comment[];
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  faPaperPlane = faPaperPlane;
  showEmojiPicker: boolean = false;
  text: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _postService: PostService,
              public _userService: UserService,
              public _authService: AuthService) {
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this._postService.getPostById(this._activatedRoute.snapshot.paramMap.get("postId"))
      .subscribe(post => {
        this.post = post;
      });
    this._postService.getComments(this._activatedRoute.snapshot.paramMap.get("postId"))
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  addEmoji($event: any) {
    if (this.text === undefined) {
      this.text = $event.emoji.native;
      return;
    }
    this.text += $event.emoji.native;
  }

  sendComment(): void {
    this._postService.sendComment(this.post.id, this.text)
      .subscribe(comment => this.comments.concat(comment));
  }
}
