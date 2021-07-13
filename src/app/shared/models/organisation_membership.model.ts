import {User} from "./user.model";
import {Organisation} from "./organisation.model";

export class OrganisationMembership {
  user: User;
  organisation: Organisation;
  isOwner: boolean;
  isAdmin: boolean;


  constructor(user: User) {
    this.user = user;
  }
}


