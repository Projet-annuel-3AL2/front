import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {faCalendarAlt, faImage, faSmile, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.css']
})
export class DialogCreatePostComponent implements OnInit {
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  showPopup: boolean = false;
  showEmojiPicker: boolean = false;
  text: string;
  constructor(public _authService: AuthService,
              private _postService: PostService,
              public dialogRef: MatDialogRef<DialogCreatePostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {sharesPost: Post}) { }

  ngOnInit(): void {
  }

  addEmoji($event: any) {
    if(this.text === undefined){
      this.text = $event.emoji.native;
      return;
    }
    this.text += $event.emoji.native;
  }

  sendPost() {
    let post: Post = new Post();
    post.text = this.text;
    this._postService.createPost(post)
      .subscribe(console.log);
    this.dialogRef.close();
  }
}
