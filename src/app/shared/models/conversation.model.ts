import {Message} from "./message.model";
import {Organisation} from "./organisation.model";
import {Group} from "./group.model";
import {Friendship} from "./friendship.model";

export class Conversation {
  messages: Message[];
  group?: Group;
  organisation?: Organisation;
  friendship?: Friendship;
}
