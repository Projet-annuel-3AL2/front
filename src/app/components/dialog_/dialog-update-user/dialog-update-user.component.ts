import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-update-user',
  templateUrl: './dialog-update-user.component.html',
  styleUrls: ['./dialog-update-user.component.css']
})
export class DialogUpdateUserComponent implements OnInit {

  formData: NgForm;
  updatedUser: User;
  updatedProfilePicture: any;
  updatedBannerPicture: any;
  updatedProfilPictureURL: any;
  updatedBannerPictureURL: any;
  env: any;
  private oldUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUpdateUserComponent>,
              public _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: {user: User}) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.updatedUser = this.data.user;
    this.oldUsername = this.data.user.username;
    this.updatedProfilePicture = null;
    this.updatedBannerPicture = null;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this._userService.putUser(this.updatedUser, this.updatedProfilePicture, this.updatedBannerPicture).subscribe({
      next: () => {
        this.dialogRef.close()
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  onProfilePictureSelected() {
    const inputNode: any = document.querySelector('#profilePicture');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (e: any) => {
        const file: string =  e.target.result
        if ( file.match(/image\/*/) === null) {
          console.log('invalid file input');
          return;
        }
        if (typeof file === "string") {
          this.updatedProfilPictureURL = file;
          this.updatedProfilePicture = inputNode.files[0];
        }
      };
    }
  }

  onProfileBannerSelected() {
    const inputNode: any = document.querySelector('#profileBanner');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (e: any) => {
        const file: string = e.target.result
        if (file.match(/image\/*/) === null) {
          console.log('invalid file input');
          return;
        }
        if (typeof file === "string") {
          this.updatedBannerPictureURL = file;
          this.updatedBannerPicture = inputNode.files[0];
        }
      };
    }
  }
}
