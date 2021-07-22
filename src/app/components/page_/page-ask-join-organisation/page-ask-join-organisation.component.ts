import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page-ask-join-organisation',
  templateUrl: './page-ask-join-organisation.component.html',
  styleUrls: ['./page-ask-join-organisation.component.css']
})
export class PageAskJoinOrganisationComponent implements OnInit {

  constructor(public _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Mes organisations - " + environment.name);
  }

  ngOnInit(): void {
  }

}
