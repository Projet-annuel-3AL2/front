import {Component, OnInit} from '@angular/core';
import {faCalendarAlt, faImage, faPaperPlane, faSmile, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postId: string;
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  faPaperPlane = faPaperPlane;
  showEmojiPicker: boolean = false;
  text: string;

  constructor(private _activatedRoute: ActivatedRoute,
              public _postService: PostService,
              public _userService: UserService,
              public _authService: AuthService) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.postId = params["postId"];
      this.update();
    });
  }

  update(): void {
    this._postService.getPostById(this.postId).subscribe();
    this._postService.getComments(this.postId).subscribe();
  }

  addEmoji($event: any) {
    if (this.text === undefined) {
      this.text = $event.emoji.native;
      return;
    }
    this.text += $event.emoji.native;
  }

  sendComment(): void {
    this._postService.sendComment(this.postId, this.text).subscribe();
  }
}
