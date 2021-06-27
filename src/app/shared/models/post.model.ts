import {User} from "./user.model";
import {Media} from "./media.model";
import {Organisation} from "./organisation.model";
import {Group} from "./group.model";
import {Event} from "./event.model";

export class Post {
  id: string;
  creator: User = new User();
  organisation: Organisation;
  group: Group;
  text: string;
  likes: User[];
  sharedPosts: Post[];
  postShares: Post;
  comments: Comment[];
  medias: Media[];
  event: Event;
  createdAt: Date;
  likeCount: number;
  shareCount: number;
  commentCount: number;
}
