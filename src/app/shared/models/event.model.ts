import {User} from "./user.model";
import {Category} from "./category.model";
import {Organisation} from "./organisation.model";
import {Media} from "./media.model";
import {Post} from "./post.model";
import {Address} from "./address.model";

export class Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  latitude: number;
  longitude: number;
  participantsLimit: number;
  organisation: Organisation;
  category: Category;
  picture: Media;
  user: User;
  participants: User[];
  posts: Post[];
  isMember: boolean = false;
  isOwner: boolean = false;
  address: Address;
}
