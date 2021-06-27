import {User} from "./user.model";

export class Message {
  id: string;
  text: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
