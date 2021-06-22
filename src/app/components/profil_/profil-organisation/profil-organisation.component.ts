import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {Post} from "../../../shared/models/post.model";
import {Event} from '../../../shared/models/event.model';
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-profil-organisation',
  templateUrl: './profil-organisation.component.html',
  styleUrls: ['./profil-organisation.component.css']
})
export class ProfilOrganisationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  organisation$: Organisation = new Organisation();
  listMember: User[] = [];
  organisationName: string;
  faEllipsisH = faEllipsisH;
  user: User;
  constructor(private organisationService: OrganisationService,
              private route: ActivatedRoute,
              private userService: UserService,
              // private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.organisationName = this.route.snapshot.params['organisationName']
    this.organisation$ = this.organisationService.fakeGetOrganisation();
    this.listMember = this.userService.fakeGetParticipants("a");
    this.user = this.userService.fakeGetUser("a");
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
    // this.getOrganisation();
    // this.getListMember();
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

  // TODO : Implémenter la fonctionnalité de follow
  canFollow() {
    return false;
  }

  followOrganisation(name: string) {

  }

  unFollowOrganisation(name: string) {

  }
}
