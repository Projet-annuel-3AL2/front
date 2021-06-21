import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";

@Component({
  selector: 'app-organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.css']
})
export class OrganisationCardComponent implements OnInit {

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
