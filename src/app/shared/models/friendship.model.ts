import {Conversation} from "./conversation.model";
import {User} from "./user.model";

export class Friendship {
  conversation: Conversation;
  friendOne: User;
  friendTwo: User;
}
