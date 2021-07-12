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
  medias: File[];
  mediasURL: string[];
  caretPosition: number;
  showPopup: boolean = false;
  showEmojiPicker: boolean = false;
  text: string;

  constructor(public _authService: AuthService,
              private _postService: PostService,
              public dialogRef: MatDialogRef<DialogCreatePostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { sharesPost: Post }) {
  }

  ngOnInit(): void {
  }

  addEmoji($event: any) {
    if (this.text === undefined) {
      this.text = $event.emoji.native;
      return;
    }
    this.text = this.text.slice(0, this.caretPosition) + $event.emoji.native + this.text.slice(this.caretPosition);
  }

  sendPost() {
    this._postService.createPost(this.text, this.data?.sharesPost, this.medias)
      .subscribe();
    this.dialogRef.close();
  }

  setCaretPosition($event: any) {
    if ($event.target.selectionStart) {
      this.caretPosition = $event.target.selectionStart;
    } else {
      this.caretPosition = 0;
    }
  }

  openFileSelector() {
    document.getElementById('file-selector').click();
  }

  addImages($event: any) {
    const files: File[] = Array.from($event.target.files);
    if (files.length > 4 && files.some((file: File) => file.type.match(/image\/*/) === null)) {
      console.log('invalid file input');
      return;
    }
    this.medias = files;
    this.mediasURL = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        if (typeof reader.result === "string") {
          this.mediasURL.push(reader.result);
        }
      }
    }
  }

  removeImage() {

  }
}
