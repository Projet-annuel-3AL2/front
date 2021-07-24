import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";
import {faBuilding, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../services/user/user.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-card-organisation',
  templateUrl: './card-organisation.component.html',
  styleUrls: ['./card-organisation.component.css']
})
export class CardOrganisationComponent implements OnInit {
  faUserPlus = faUserPlus;
  faBuilding = faBuilding;
  @Input('organisation')
  organisation: Organisation;

  constructor(private _userService: UserService,
              private _organisationService: OrganisationService) {
  }

  ngOnInit(): void {
    this.canFollow().then();
  }

  async canFollow() {
    this.organisation.isFollower = await this._userService.isFollowingOrganisation(this.organisation.id).toPromise();
  }

  followOrganisation() {
    this._organisationService.followOrganisation(this.organisation.id).toPromise().then(() => this.organisation.isFollower = true);
  }

  unfollowOrganisation() {
    this._organisationService.unfollowOrganisation(this.organisation.id).toPromise().then(() => this.organisation.isFollower = false);
  }
}
