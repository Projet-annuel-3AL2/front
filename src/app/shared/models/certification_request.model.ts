import {User} from "./user.model";

export class CertificationRequest {
  id: string;
  comment: string;
  user: User;
  createdAt: Date;
}
