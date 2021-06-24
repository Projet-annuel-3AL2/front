import { Component, OnInit } from '@angular/core';
import {faTimes, faImage, faSmile, faCalendarAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  showPopup:boolean = false;
  showEmojiPicker: boolean = false;
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  user$: User;
  text: string;

  constructor(private _authService: AuthService,
              private _userService: UserService,
              private _postService: PostService) { }

  ngOnInit(): void {
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.user$=user;
    });
  }

  addEmoji($event: any) {
    this.text += $event.emoji.native;
  }

  openPopup() {
    this.text = "";
    this.showPopup = true;
    document.querySelector("body").classList.add("no-scroll");
  }

  closePopup() {
    this.text = "";
    this.showPopup = false;
    this.showEmojiPicker = false;
    document.querySelector("body").classList.remove("no-scroll");
  }

  sendPost() {
    let post: Post= new Post();
    post.text = this.text;
    this._postService.createPost(post)
      .subscribe(console.log);
    this.closePopup();
  }
}
