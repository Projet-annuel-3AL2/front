import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {faClock, faMapMarkerAlt, faTags, faUserCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {
  faUserCheck = faUserCheck;
  faClock = faClock;
  faTags = faTags;
  faMapMarkerAlt = faMapMarkerAlt;
  @Input()
  event: Event = new Event();
  isFollowing: boolean = false;

  constructor(private _organisationService: OrganisationService,
              public _authService: AuthService,
              private _userService: UserService) {
  }

  ngOnInit(): void {
  }


}
