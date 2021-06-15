import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {Post} from "../../../shared/models/post.model";
import {Event} from '../../../shared/models/event.model';
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profil-organisation',
  templateUrl: './profil-organisation.component.html',
  styleUrls: ['./profil-organisation.component.css']
})
export class ProfilOrganisationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  organisation$: Organisation = new Organisation('a','b',undefined);
  listMember: User[] = [];
  organisationName: string;

  constructor(private organisationService: OrganisationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.organisationName = this.route.snapshot.params['organisationName']
    this.getOrganisation();
    this.getListMember();
  }

  isNotAlreadyMember() {
    return true;
  }

  askJoin(id: string) {

  }

  private getOrganisation() {
    this.organisationService.getOrganisationByName(this.organisationName).subscribe({
      next: organisation => {
        this.organisation$ = organisation
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getListMember() {
    this.organisation$.members.forEach(membership => {
      this.listMember.push(membership.user);
    })
  }
}
