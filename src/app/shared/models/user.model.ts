import {Post} from "./post.model";
import {Media} from "./media.model";
import {Certification} from "./certification.model";
import {Event} from "./event.model";

export class User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  createdEvents: Event[];
  createdPosts: Post[];
  likedPosts: Post[];
  profilePicture: Media;
  bannerPicture: Media;
  certification: Certification;

}
