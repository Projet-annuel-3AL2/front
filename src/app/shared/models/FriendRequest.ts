import {User} from "./user.model";

export class FriendRequest {
  sender: User;
  createdAt: Date;
  user: User;
}
