import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getParticipants(id: string) {
    let users: User[];
    users = [
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id)
    ]
    return users;
  }

  private getUser(id: string) {
    const user: User = {
      bannerPicture: undefined,
      certification: undefined,
      createdEvents: [],
      createdPosts: [],
      firstname: "firstName",
      id: "1",
      lastname: "lastname",
      likedPosts: [],
      profilePicture: undefined,
      username: "username"
    }
    return user;
  }
}
