import {Component, OnInit} from '@angular/core';
import {faBell, faCalendarAlt, faComments, faUserFriends, faSearch} from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
