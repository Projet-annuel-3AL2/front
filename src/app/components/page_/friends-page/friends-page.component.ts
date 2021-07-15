import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  constructor(public _authService: AuthService, public _friendshipService: FriendshipService) { }

  ngOnInit(): void {
    this.update();
  }

  update(){
    this._friendshipService.getReceivedFriendshipRequest().subscribe();
    this._friendshipService.getSentFriendshipRequest().subscribe();
  }
}
