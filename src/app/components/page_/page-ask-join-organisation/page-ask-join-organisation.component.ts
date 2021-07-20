import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-page-ask-join-organisation',
  templateUrl: './page-ask-join-organisation.component.html',
  styleUrls: ['./page-ask-join-organisation.component.css']
})
export class PageAskJoinOrganisationComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

}
