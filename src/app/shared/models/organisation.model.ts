import {User} from "./user.model";
import {Media} from "./media.model";
import {Conversation} from "./conversation.model";
import {Post} from "./post.model";
import {Event} from "./event.model";

export class Organisation {
  id: string;
  name: string;
  owner: User;
  members: User[];
  events: Event[];
  profilePicture: Media;
  bannerPicture: Media;
  conversation: Conversation;
  posts: Post[];
  invitedUsers: User[];
  isFollower: boolean;
  isOwner: boolean;
  isAdmin: boolean;


  constructor() {
  }
}
