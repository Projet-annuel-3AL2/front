import {User} from "./user.model";
import {Media} from "./media.model";

export class Comment {
  id: string;
  creator: User;
  text: string;
  medias: Media[];
  createdAt: Date;
}
