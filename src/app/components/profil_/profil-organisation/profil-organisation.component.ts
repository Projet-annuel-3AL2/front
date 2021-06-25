import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-profil-organisation',
  templateUrl: './profil-organisation.component.html',
  styleUrls: ['./profil-organisation.component.css']
})
export class ProfilOrganisationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  organisation$: Organisation;
  organisationName: string;
  faEllipsisH = faEllipsisH;
  user: User;
  listMember$: User[];

  constructor(private _organisationService: OrganisationService,
              private route: ActivatedRoute,
              private _userService: UserService,
              private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.organisationName = this.route.snapshot.params['organisationName']

    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.user=user;
    });
    // this.getOrganisation();
    // this.getListMember();
  }

  private getOrganisation() {
    this._organisationService.getOrganisationByName(this.organisationName).subscribe({
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
    this._organisationService.getOrganisationMembership(this.organisationName).subscribe({
      next: listOrganisationMembership => {
        listOrganisationMembership.forEach(organisationMembership => {
          this.listMember$.push(organisationMembership.user);
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
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

  // TODO : isOwner pour modification Organisation
  isOwner() {
    return true;
    // return this.organisation$.owner.id == this.user.id;
  }


  // TODO: IsAdmin de l'event (fonction dé***)
  isAdmin() {
    let isAdmin = false;
    // this._eventService.getEventOrganisationMembership(this.eventId).subscribe({
    //   next: listMemberShip => {
    //     listMemberShip.forEach(member => {
    //       if (member.user.id == this.user.id && member.isAdmin){
    //         isAdmin = true;
    //       }
    //     })
    //   },
    //   error: error => {
    //     if (!environment.production) {
    //       console.error('Error: ', error);
    //     }
    //   }
    // })
    return isAdmin;
  }
}
