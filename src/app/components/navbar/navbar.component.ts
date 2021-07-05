import {Component, OnInit} from '@angular/core';
import {faBell, faCalendarAlt, faComments, faSearch, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/models/user.model";
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
  faSearch = faSearch;
  userSession: User;
  constructor(private _activatedRoute:ActivatedRoute,
              public _authService: AuthService,
              private _userService: UserService,
              private _router:Router) {
  }

  ngOnInit(): void {
    this._userService.getByUsername(this._authService.getCurrentUsername()).subscribe(user=>{
      this.userSession=user;
    });
  }

  public onDisconnect() {
    this._authService.logout().subscribe(() => this._router.navigate(['../login']));
  }
}
