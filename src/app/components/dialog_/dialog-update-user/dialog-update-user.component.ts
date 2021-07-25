import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  formData: FormGroup;
  updatedProfilePicture: any;
  updatedBannerPicture: any;
  updatedProfilePictureURL: any;
  updatedBannerPictureURL: any;
  env: any;

  constructor(public dialogRef: MatDialogRef<DialogUpdateUserComponent>,
              private _formBuilder: FormBuilder,
              public _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.updatedProfilePicture = null;
    this.updatedBannerPicture = null;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this._userService.putUser(this.formData, this.updatedProfilePicture, this.updatedBannerPicture)
      .toPromise()
      .then(() => this.dialogRef.close());
  }

  onProfilePictureSelected() {
    const inputNode: any = document.querySelector('#profilePicture');
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
          this.updatedProfilePictureURL = file;
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

  private initializeFormGroup() {
    this.formData = this._formBuilder.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      lastname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
      ]),
      mail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      bio: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]),
      profilePicture: new FormControl('',[]),
      bannerPicture: new FormControl('', [])
    });

    this.formData.patchValue({
      firstname: this.data.user.firstname,
      lastname: this.data.user.lastname,
      mail: this.data.user.mail,
      bio: this.data.user.bio
    })
  }
}
