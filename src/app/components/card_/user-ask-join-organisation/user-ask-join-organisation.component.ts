import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-ask-join-organisation',
  templateUrl: './user-ask-join-organisation.component.html',
  styleUrls: ['./user-ask-join-organisation.component.css']
})
export class UserAskJoinOrganisationComponent implements OnInit {

  @Input('organisation') organisation: Organisation;
  faTimes=faTimes;
  constructor(public _organisationService: OrganisationService) {
  }

  ngOnInit(): void {
  }

  acceptRequest() {
    this._organisationService.acceptInvitation(this.organisation.id).toPromise().then();
  }

  rejectRequest() {
    this._organisationService.rejectInvitation(this.organisation.id).toPromise().then();
  }

}
