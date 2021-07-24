import {Component, OnInit} from '@angular/core';
import {faCalendarAlt, faImage, faPaperPlane, faSmile, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  faPaperPlane = faPaperPlane;
  showEmojiPicker: boolean = false;
  text: string;
  post: Post;

  constructor(private _activatedRoute: ActivatedRoute,
              public _postService: PostService,
              public _userService: UserService,
              public _authService: AuthService,
              private _titleService: Title,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => this.update(params["postId"]));
  }

  update(postId: string): void {
    this._postService.getPostById(postId).toPromise().then(post => {
      this.post = post;
      this._titleService.setTitle(post.text + " - " + environment.name);
    });
    this._postService.getComments(postId).toPromise().then(comments=>this.post.comments = comments);
  }

  addEmoji($event: any) {
    if (this.text === undefined) {
      this.text = $event.emoji.native;
      return;
    }
    this.text += $event.emoji.native;
  }

  sendComment(): void {
    if (this.text === undefined || this.text.length <= 0) {
      this.snackBar.open("Impossible d'envoyer un commentaire vide", "Fermer");
      return;
    }
    this._postService.sendComment(this.post.id, this.text).toPromise().then(comment=>{
      if (this.post.comments === undefined) {
        this.post.comments = [];
      }
      this.post.comments = [comment].concat(this.post.comments);
    });
  }
}
