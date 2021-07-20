import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-page-ask-join-organisation',
  templateUrl: './page-ask-join-organisation.component.html',
  styleUrls: ['./page-ask-join-organisation.component.css']
})
export class PageAskJoinOrganisationComponent implements OnInit {

  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.updateData();
  }

  private updateData() {
    this._userService.getInvitationsOrganisation().subscribe()
  }
}
