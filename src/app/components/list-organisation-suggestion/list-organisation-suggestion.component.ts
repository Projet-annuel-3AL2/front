import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../services/organisation/organisation.service";
import {Organisation} from "../../shared/models/organisation.model";
import {environment} from "../../../environments/environment";
import {EventService} from "../../services/event/event.service";

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
    this._organisationService.getSuggestions().subscribe({
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

}
