import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {faCalendarAlt, faImage, faSmile, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SearchService} from "../../../services/search/search.service";
import {Event} from "../../../shared/models/event.model";

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
  caretPosition: number=0;
  showPopup: boolean = false;
  text: string;
  events: Event[];
  constructor(public _authService: AuthService,
              private _postService: PostService,
              private _searchService: SearchService,
              public dialogRef: MatDialogRef<DialogCreatePostComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {sharedEvent: Event, sharesPost: Post }) {
  }

  ngOnInit(): void {
  }

  addEmoji($event: any) {
    if (this.text === undefined) {
      this.text = $event.emoji.native;
      return;
    }
    this.text = [this.text.slice(0, this.caretPosition), $event.emoji.native, this.text.slice(this.caretPosition)].join('');
    this.caretPosition+=$event.emoji.native.length;
  }

  sendPost() {
    console.log(this.data)
    if(this.text === undefined && this.text === '' && this.medias.length <= 0 && this.data.sharesPost === undefined && this.data.sharedEvent === undefined) {
      this._snackBar.open("Vous ne pouvez créer un poste s'il est vide.", "Fermer");
      return;
    }
    this._postService.createPost(this.text, this.data?.sharesPost?.id, this.data?.sharedEvent?.id, this.medias).subscribe();
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
    if(files.length > 4){
      this._snackBar.open("Vous ne pouvez ajouter que 4 medias au maximum.", "Fermer");
      return;
    }
    if (files.some((file: File) => file.type.match(/image\/*/) === null)) {
      this._snackBar.open("Vous ne pouvez ajouter que des images.", "Fermer");
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

  searchEvents($event: any) {
    this._searchService.searchEvent($event.target.value).subscribe(events=> {
      console.log(events)
      this.events = events;
    });
  }
}
