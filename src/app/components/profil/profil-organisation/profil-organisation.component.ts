import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {Post} from "../../../shared/models/post.model";
import {Event} from '../../../shared/models/event.model';
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-profil-organisation',
  templateUrl: './profil-organisation.component.html',
  styleUrls: ['./profil-organisation.component.css']
})
export class ProfilOrganisationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  organisation: Organisation = new Organisation('a','b',undefined);
  listMember: User[] = [];

  constructor(private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.getOrganisation();
    this.getListMember();
  }

  isNotAlreadyMember() {
    return true;
  }

  askJoin(id: string) {

  }

  private getOrganisation() {
    this.organisation = this.organisationService.getOrganisation();
  }

  private getListMember() {
    this.organisation.members.forEach(membership => {
      this.listMember.push(membership.user);
    })
  }
}
