import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";
import {UserService} from "../../../services/user/user.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-ask-join-organisation',
  templateUrl: './user-ask-join-organisation.component.html',
  styleUrls: ['./user-ask-join-organisation.component.css']
})
export class UserAskJoinOrganisationComponent implements OnInit {

  @Input('organisation') organisation: Organisation;
  env: any;

  constructor(public _organisationService: OrganisationService) {
    this.env = environment;
  }

  ngOnInit(): void {
  }

  acceptRequest() {
    this._organisationService.acceptInvitation(this.organisation.id).subscribe({
      error: err => {
        if (!environment.production){
          console.error(err)
        }
      }
    });
  }

  rejectRequest() {
    this._organisationService.rejectInvitation(this.organisation.id).subscribe({
      error: err => {
        if (!environment.production){
          console.error(err)
        }
      }
    });
  }

}
