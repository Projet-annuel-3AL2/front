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
  updatedProfilPicture: any;
  updatedBannerPicture: any;
  private oldUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUpdateUserComponent>,
              private _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: {user: User}) { }

  ngOnInit(): void {
    this.updatedUser = this.data.user;
    this.oldUsername = this.data.user.username;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit(data: NgForm) {

    this.updatedUser.username = data.value.username;
    this.updatedUser.bio = data.value.bio;
    this.updatedUser.firstname = data.value.firstname;
    this.updatedUser.lastname = data.value.lastname;
    this.updatedUser.mail = data.value.mail;
    // this.updatedUser.profilePicture = data.profilePicture;
    // this.updatedUser.bannerPicture = data.bannerPicture;

    console.log(this.updatedUser)
    console.log(this.updatedProfilPicture)
    console.log(this.updatedBannerPicture)
    this._userService.putUser(this.oldUsername, this.updatedUser).subscribe({
      next: () => {
        console.log("ok")
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

      reader.onload = (e: any) => {
        this.updatedProfilPicture = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  onProfileBannerSelected() {
    const inputNode: any = document.querySelector('#profileBanner');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.updatedBannerPicture = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }
}
