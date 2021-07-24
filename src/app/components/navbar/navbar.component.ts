import {Component, OnInit} from '@angular/core';
import {faBuilding, faCalendarAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  faBuilding = faBuilding;
  env: any;

  constructor(private _activatedRoute: ActivatedRoute,
              public _authService: AuthService,
              private _userService: UserService,
              private _router: Router) {
    this.env = environment;
  }

  ngOnInit(): void {
  }

  public onDisconnect() {
    this._authService.logout()
      .toPromise()
      .then(() => this._router.navigate(['../login']));
  }
}
