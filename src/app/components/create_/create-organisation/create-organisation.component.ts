import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Organisation} from "../../../shared/models/organisation.model";

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})
export class CreateOrganisationComponent implements OnInit {

  showPopup: boolean = false;
  user: User;
  formData: FormGroup;

  constructor(private userService: UserService,
              // private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.user = this.userService.fakeGetUser('fakeData')
    this.initialiseFormGroup();
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
  }


  openPopup() {
    this.showPopup = true;
    document.querySelector("body").classList.add("no-scroll");
  }

  closePopup() {
    this.showPopup = false;
    document.querySelector("body").classList.remove("no-scroll");
  }

  private initialiseFormGroup() {
    this.formData = new FormGroup({
      name: new FormControl(),
      profilPicture: new FormControl(),
      bannerPicture: new FormControl()
    });
  }

  onClickSubmit(data) {
    let newOrganisation: Organisation = new Organisation();
    newOrganisation.name = data.name;
    newOrganisation.owner = this.user;
    newOrganisation.profilePicture = data.profilPicture;
    newOrganisation.bannerPicture = data.bannerPicture;
    console.log(newOrganisation);
  }
}
