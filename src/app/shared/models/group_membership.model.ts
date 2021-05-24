import {Group} from "./group.model";
import {User} from "./user.model";

export class GroupMembership {
  user: User;
  group: Group;
  isAdmin: boolean;
}
