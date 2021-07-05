import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-update-organisation',
  templateUrl: './update-organisation.component.html',
  styleUrls: ['./update-organisation.component.css']
})
export class UpdateOrganisationComponent implements OnInit {

  @Input('organisation') organisation: Organisation;
  showPopup: boolean;
  formData: FormGroup;
  user$: User;
  orgaOldName: string;

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _organisationService: OrganisationService) { }

  ngOnInit(): void {

    this.orgaOldName = this.organisation.name;
    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user=>{
      this.user$ =user;
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
    this.organisation.name = data.name;
    this.organisation.owner = this.user$;
    this.organisation.profilePicture = data.profilPicture;
    this.organisation.bannerPicture = data.bannerPicture;
    console.log(this.organisation);
    // TODO: update-organisation pas activé
    // this._organisationService.putOrganisation(this.orgaOldName, this.organisation);
  }
}
