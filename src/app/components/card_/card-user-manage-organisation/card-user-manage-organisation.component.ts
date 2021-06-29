import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {environment} from "../../../../environments/environment";
import {OrganisationMembership} from "../../../shared/models/organisation_membership.model";

@Component({
  selector: 'app-card-user-manage-organisation',
  templateUrl: './card-user-manage-organisation.component.html',
  styleUrls: ['./card-user-manage-organisation.component.css']
})
export class CardUserManageOrganisationComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('organisation') organisation: Organisation;
  @Input('userSession') userSession: User;
  faCheckCircle = faCheckCircle;

  canAdd: number = 0;
  isAdminOrga: boolean = false;
  isOwner: boolean = false;
  userIsAdmin: boolean = false;

  constructor(private _friendshipService: FriendshipService,
              private _authService: AuthService,
              private _userService: UserService,
              private _organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.canAddFriend();
    this.isUserAdminFormOrga();
    this.isOwnerOrga();
    this.userIsAdminOrga();
  }

  // TODO : Logique de Un user peut ajouter ou non un amis (voir list d'amis)
  canAddFriend() {
    this.canAdd = 0;
  }

  private isOwnerOrga() {
    this.isOwner = this.organisation.owner.id == this.userSession.id;
  }

  private userIsAdminOrga() {
    this._organisationService.getMembersOrga(this.organisation.id).subscribe({
        next: organisationMemberships => {
          organisationMemberships.forEach(organisationMembership => {
            // Vérifie que l'UserSession est admin
            if (organisationMembership.user.id == this.userSession.id && organisationMembership.isAdmin){
              this.isAdminOrga = true;
            }
            // Vérifie que l'User passer en paramètre est admin
            if (organisationMembership.user.id == this.user.id && organisationMembership.isAdmin){
              this.userIsAdmin = true;
            }
          })
        },
        error: error => {
          if (!environment.production) {
            console.error('Error: ', error);
          }
        }
    });
  }

  private isUserAdminFormOrga() {

  }

  askFriend(username: string) {
    // this._friendshipService.postFriendship(username);
  }

  dellFriend(username: string) {
    // this._friendshipService.removeFriendship(username)
  }

  deleteMembership(userId: string) {
    this._organisationService.deleteOrganisationMembership(userId, this.organisation.id);
  }

  giveAdmin(userId: string) {
    this._organisationService.giveAdminToMember(userId, this.organisation.id);
  }

  removeAdmin(userId: string) {
    this._organisationService.removeAdminToAdminMember(userId, this.organisation.id);
  }
}
