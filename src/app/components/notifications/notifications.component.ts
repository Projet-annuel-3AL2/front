import {Component, OnInit} from '@angular/core';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {FriendshipService} from "../../services/friendship/friendship.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  faBell = faBell;

  constructor(public _authService: AuthService, public _friendshipService: FriendshipService) {
  }

  ngOnInit(): void {
    this._friendshipService.getReceivedFriendshipRequest().subscribe();
  }

}
