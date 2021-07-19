import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {PostService} from "../../../services/post/post.service";
import {DialogCreatePostComponent} from "../../dialog_/dialog-create-post/dialog-create-post.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _userService: UserService,
              private _postService: PostService,
              public dialogReport: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPopup() {
    this.dialogReport.open(DialogCreatePostComponent, {minWidth: "500px", minHeight: "121px", data: {}});
  }
}
