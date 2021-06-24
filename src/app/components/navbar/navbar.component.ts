import {Component, OnInit} from '@angular/core';
import {faBell, faCalendarAlt, faComments, faSearch, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private _activatedRoute:ActivatedRoute,
              public _authService: AuthService,
              private _router:Router) {
  }

  ngOnInit(): void {
  }

  public onDisconnect() {
    this._authService.logout().subscribe(() => this._router.navigate(['../login']));
  }
}
