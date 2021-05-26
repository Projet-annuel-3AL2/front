import { Component, OnInit } from '@angular/core';
import {faCalendarAlt, faBell, faUserFriends, faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCalendarAlt=faCalendarAlt;
  faBell=faBell;
  faUserFriends=faUserFriends;
  faComments=faComments;
  constructor() { }

  ngOnInit(): void {
  }

}
