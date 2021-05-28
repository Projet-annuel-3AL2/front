import {Component, OnInit} from '@angular/core';
import {faBell, faCalendarAlt, faComments, faUserFriends, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

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

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public onDisconnect() {
    this.authService.logout().subscribe(()=>this.router.navigate(['../login']));
  }
}
