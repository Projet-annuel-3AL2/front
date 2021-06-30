import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})
export class CreateOrganisationComponent implements OnInit {

  showPopup: boolean = false;
  user$: User;
  formData: FormGroup;

  constructor(private _userService: UserService,
              private _organisationService: OrganisationService,
              private _authService: AuthService
  ) { }

  ngOnInit(): void {

    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.user$=user;
    });
    this.initialiseFormGroup();
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
    newOrganisation.owner = this.user$;
    newOrganisation.profilePicture = data.profilPicture;
    newOrganisation.bannerPicture = data.bannerPicture;
    console.log(newOrganisation);
    // TODO : create-organisation onClickSubmit() pas activé
    // this._organisationService.postOrganisation(newOrganisation);
  }
}
