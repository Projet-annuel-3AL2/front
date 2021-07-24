import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../services/organisation/organisation.service";
import {Organisation} from "../../shared/models/organisation.model";

@Component({
  selector: 'app-list-organisation-suggestion',
  templateUrl: './list-organisation-suggestion.component.html',
  styleUrls: ['./list-organisation-suggestion.component.css']
})
export class ListOrganisationSuggestionComponent implements OnInit {

  listOrganisation$: Organisation[];

  constructor(public _organisationService: OrganisationService) {
  }

  ngOnInit(): void {
    this.getSuggestionOrganisation();
  }

  private getSuggestionOrganisation() {
    this._organisationService.getSuggestions()
      .toPromise()
      .then(organisations=>this.listOrganisation$ = organisations);
  }

}
