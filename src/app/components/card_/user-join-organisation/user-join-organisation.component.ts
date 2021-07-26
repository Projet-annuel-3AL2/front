import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {environment} from "../../../../environments/environment";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-join-organisation',
  templateUrl: './user-join-organisation.component.html',
  styleUrls: ['./user-join-organisation.component.css']
})
export class UserJoinOrganisationComponent implements OnInit {

  @Input('user') user: User;
  @Input('organisationId') organisationId: string;
  faCheckCircle = faCheckCircle;
  env: any;

  constructor(private _organisationService: OrganisationService) {
    this.env = environment
  }

  ngOnInit(): void {
  }

  cancelJoin() {
    this._organisationService.cancelInvitation(this.organisationId, this.user.id)
      .toPromise()
      .then(() => this._organisationService.getInvitedOrganisation(this.organisationId));
  }

}
