import {User} from "./user.model";
import {Organisation} from "./organisation.model";

export class OrganisationMembership {
  user: User;
  organisation: Organisation;
  isAdmin: boolean;
}
