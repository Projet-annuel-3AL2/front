import {User} from "./user.model";
import {Category} from "./category.model";
import {Organisation} from "./organisation.model";
import {Media} from "./media.model";

export class Event {
  id: string;
  name: String;
  description: String;
  creator: User;
  startDate: Date;
  endDate: Date;
  latitude: number;
  longitude: number;
  participantsLimit: number;
  organisation: Organisation;
  category: Category;
  picture: Media;
  participants: User[];
}
