import {User} from "./user.model";

export class OrganisationRequest {
  id: string;
  name: string;
  comment: string;
  user: User;
  createdAt: Date;
}
