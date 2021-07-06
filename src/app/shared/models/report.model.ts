import {User} from "./user.model";
import {Group} from "./group.model";
import {Post} from "./post.model";
import {Organisation} from "./organisation.model";

export class Report {
  text: string;
  userReporter: User;
  reportedUser?: User;
  reportedGroup?: Group;
  reportedPost?: Post;
  reportedOrganisation?: Organisation;
  reportedEvent?: Event;
}
