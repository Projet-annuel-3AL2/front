import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {FriendshipService} from "../../services/friendship/friendship.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('user') user: User = new User()
  constructor(private friendshipService: FriendshipService) { }

  ngOnInit(): void {
  }

  addFriend(username: string) {
    this.friendshipService.postFriendship(username);
  }
}
