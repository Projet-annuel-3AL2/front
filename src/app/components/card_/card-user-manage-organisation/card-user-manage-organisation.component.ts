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

  constructor(private _friendshipService: FriendshipService,
              private _authService: AuthService,
              private _userService: UserService,
              private _organisationService: OrganisationService) { }

  ngOnInit(): void {
    console.log(this.user.id + "  " + this.userSession.id)
  }

  // TODO : Logique de Un user peut ajouter ou non un amis (voir list d'amis)
  canAdd(userId: string) {
    return true;
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

  // TODO: IsOwner() dela page-event
  isOwner() {
    return true;
    // return this.event.creator.id == this.user.id;
  }

  // TODO: canRemove from Organisation la
  canRemoveUser(id: string): Boolean {
    let canRemove = false;

    // this._organisationService.getOrganisationMembership(this.organisation.id).subscribe({
    //   next: listMemberShip => {
    //     listMemberShip.forEach(member => {
    //       if (member.user.id == this.user.id && member.isAdmin){
    //         canRemove = true;
    //       }
    //     })
    //   },
    //   error: error => {
    //     if (!environment.production) {
    //       console.error('Error: ', error);
    //     }
    //   }
    // })
    return canRemove;
  }

  userIsAdmin(userId: string) {
    let isAdmin = false;

    this._organisationService.getFullOrganisation(this.organisation.id).subscribe({
      next: organisation => {
        organisation.members.forEach(member => {
          if (member.user.id == userId && member.isAdmin){
            isAdmin = true;
          }
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
    return isAdmin;
  }

  giveAdmin(userId: string) {
    this._organisationService.giveAdminToMember(userId, this.organisation.id);
  }

  removeAdmin(userId: string) {
    this._organisationService.removeAdminToAdminMember(userId, this.organisation.id);
  }

}
