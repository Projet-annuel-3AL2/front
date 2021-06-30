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
  organisationId: string;
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
    this.organisationId = this.route.snapshot.params['id']
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession$=user;
    });
    this.getOrganisation();
  }

  private getOrganisation() {
    this._organisationService.getOrganisation(this.organisationId).subscribe({
      next: organisation => {
        this.organisation$ = organisation;
        this.getOrganisationMember();
        this.isOwner();
        this.canFollow();
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  isOwner() {
      if (this.organisation$.owner.id == this.userSession$.id){
        this.isOwnerB = true
      }
  }

  private getOrganisationMember() {
    // this._organisationService.getMembersOrga(this.organisationId).subscribe({
    //   next: listMemberShip => {
    //     listMemberShip.forEach(member => {
    //       this.listMember$.push(member.user)
    //       // isAdmin()
    //       if (member.user.id == this.userSession$.id && member.isAdmin){
    //         this.isAdminB = true;
    //       }
    //     })
    //   },
    //   error: error => {
    //     if (!environment.production) {
    //       console.error('Error: ', error);
    //     }
    //   }
    // });
    this._organisationService.getMemberOrganisation(this.organisationId).subscribe({
      next: users => {
        this.listMember$ = users;
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
}
