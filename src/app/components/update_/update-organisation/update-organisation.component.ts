import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-update-organisation',
  templateUrl: './update-organisation.component.html',
  styleUrls: ['./update-organisation.component.css']
})
export class UpdateOrganisationComponent implements OnInit {

  @Input('organisation') organisation: Organisation;
  showPopup: boolean;
  formData: FormGroup;
  user: User;
  orgaOldName: string;

  constructor(private userService: UserService,
              // private authService: AuthService,
              private organisationService: OrganisationService) { }

  ngOnInit(): void {

    this.orgaOldName = this.organisation.name;
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
    this.organisation.name = data.name;
    this.organisation.owner = this.user;
    this.organisation.profilePicture = data.profilPicture;
    this.organisation.bannerPicture = data.bannerPicture;
    console.log(this.organisation);
    // this.organisationService.putOrganisation(this.orgaOldName, this.organisation);
  }
}
