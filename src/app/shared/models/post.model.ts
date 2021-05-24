import {User} from "./user.model";
import {Media} from "./media.model";
import {Organisation} from "./organisation.model";
import {Group} from "./group.model";

export class Post {
  id: string;
  creator: User;
  organisation: Organisation;
  group: Group;
  text: string;
  likes: User[];
  sharedPost: Post;
  postShares: Post;
  comments: Comment[];
  medias: Media[];
  event: Event;
  createdAt: Date;
}
