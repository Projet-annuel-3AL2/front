import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {Organisation} from "../../../shared/models/organisation.model";
import {User} from "../../../shared/models/user.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {EventService} from "../../../services/event/event.service";
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../shared/models/post.model";

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
  userSession$: User;
  listMember$: User[]= [];
  isOwnerB: boolean = false;
  isAdminB: boolean = false;
  isCanFollow: boolean = true;
  listPosts$: Post[];
  constructor(private _organisationService: OrganisationService,
              private route: ActivatedRoute,
              private _userService: UserService,
              private _authService: AuthService,
              private _eventService: EventService,
              private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.organisationName = this.route.snapshot.params['organisationName']
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession$=user;
      this.isOwner();
      this.isAdmin();
      this.canFollow();
    });
    this.getOrganisation();


  }

  private getOrganisation() {
    this._organisationService.getFullOrganisation(this.organisationName).subscribe({
      next: organisation => {
        this.organisation$ = organisation;
        this.organisation$.members.forEach(orgaMembership => {
          this.listMember$.push(orgaMembership.user);
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  // TODO : Implémenter la fonctionnalité de follow
  canFollow() {
    this.isCanFollow = true;
  }

  followOrganisation(name: string) {

  }

  unFollowOrganisation(name: string) {

  }

  isOwner() {
      if (this.organisation$.owner.id == this.userSession$.id){
        this.isOwnerB = true
      }
  }

  isAdmin() {
    this._eventService.getEventOrganisationMembership(this.organisation$.id).subscribe({
      next: listMemberShip => {
        listMemberShip.forEach(member => {
          if (member.user.id == this.userSession$.id && member.isAdmin){
            this.isAdminB = true;
          }
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

}
