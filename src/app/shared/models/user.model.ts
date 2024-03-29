import {Post} from "./post.model";
import {Media} from "./media.model";
import {Certification} from "./certification.model";
import {Event} from "./event.model";
import {Comment} from "./comment.model";
import {Organisation} from "./organisation.model";
import {FriendRequestStatus} from "../FriendshipRequestStatus.enum";
import {FriendRequest} from "./FriendRequest";

export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN"
}

export class User {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  mail?: string;
  bio?: string;
  isBlocked: boolean;
  blocksCurrentUser: boolean;
  userType: UserType;
  friendshipStatus: FriendRequestStatus;
  friends?: User[];
  createdEvents?: Event[];
  createdPosts?: Post[];
  likedPosts?: Post[];
  profilePicture?: Media;
  bannerPicture?: Media;
  certification?: Certification;
  eventsParticipation?: Event[];
  comments?: Comment[];
  organisations?: Organisation[];
  administratedOrganisations?: Organisation[];
  organisationInvitations?: Organisation[];
  friendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
  organisationWhereAdmin: Organisation[];
}
