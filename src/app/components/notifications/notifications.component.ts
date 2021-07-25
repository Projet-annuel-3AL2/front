import {Component, OnInit} from '@angular/core';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  faBell = faBell;

  constructor(public _authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
