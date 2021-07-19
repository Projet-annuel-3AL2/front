import {User} from "./user.model";
import {Media} from "./media.model";
import {Organisation} from "./organisation.model";
import {Group} from "./group.model";
import {Event} from "./event.model";
import {Comment} from "./comment.model";

export class Post {
  id: string;
  creator: User;
  organisation?: Organisation;
  group?: Group;
  text: string;
  likes: User[];
  sharedPosts: Post[];
  sharesPost: Post;
  comments: Comment[];
  medias: Media[];
  sharedEvent: Event;
  createdAt: Date;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isLiked: boolean;
}
