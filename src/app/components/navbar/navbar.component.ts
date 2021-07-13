import {Component, OnInit} from '@angular/core';
import {faBell, faCalendarAlt, faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faBell = faBell;
  faUserFriends = faUserFriends;
  faComments = faComments;

  constructor(private _activatedRoute: ActivatedRoute,
              public _authService: AuthService,
              private _userService: UserService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  public onDisconnect() {
    this._authService.logout().subscribe(() => this._router.navigate(['../login']));
  }
}
