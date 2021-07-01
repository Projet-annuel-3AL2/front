import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";

@Component({
  selector: 'app-card-organisation',
  templateUrl: './card-organisation.component.html',
  styleUrls: ['./card-organisation.component.css']
})
export class CardOrganisationComponent implements OnInit {

  isFollowing: boolean = false;
  @Input('organisation') organisation: Organisation;
  constructor(private _userService: UserService,
              private _organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.canFollow();
  }

  canFollow() {
    this._userService.isFollowingOrganisation(this.organisation.id).subscribe({
      next: bool =>{
        this.isFollowing = bool;
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  followOrganisation() {
    this._organisationService.followOrganisation(this.organisation.id).subscribe({
      next: () =>{
        this.isFollowing = true;
        console.log(this.isFollowing)
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  unfollowOrganisation() {
    this._organisationService.unfollowOrganisation(this.organisation.id).subscribe({
      next: () =>{
        this.isFollowing = false;
        console.log(this.isFollowing)
      },
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }
}
