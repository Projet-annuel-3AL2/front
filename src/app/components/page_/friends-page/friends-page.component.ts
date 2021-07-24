import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  constructor(public _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Amis - " + environment.name);
  }

  ngOnInit(): void {
  }

}
