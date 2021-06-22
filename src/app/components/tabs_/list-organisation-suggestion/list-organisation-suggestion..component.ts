import { Component, OnInit } from '@angular/core';
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-list-organisation-suggestion',
  templateUrl: './list-organisation-suggestion..component.html',
  styleUrls: ['./list-organisation-suggestion.component.css']
})
export class ListOrganisationSuggestionComponent implements OnInit {

  listOrganisation$: Organisation[];
  constructor(private organisationService: OrganisationService) { }

  ngOnInit(): void {
    this.listOrganisation$ = this.organisationService.getListOrganisation();
    // this.getSuggestionOrganisation();
  }

  private getSuggestionOrganisation() {
    this.organisationService.getSuggestionOrganisation().subscribe({
      next: data => {
        this.listOrganisation$ = data;
      },
        error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }
}
