import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";

@Component({
  selector: 'app-card-organisation',
  templateUrl: './card-organisation.component.html',
  styleUrls: ['./card-organisation.component.css']
})
export class CardOrganisationComponent implements OnInit {

  @Input('organisation') organisation: Organisation;
  constructor() { }

  ngOnInit(): void {
  }

  followOrganisation(name: string) {

  }

  canFollow() {
    return false;
  }
}
