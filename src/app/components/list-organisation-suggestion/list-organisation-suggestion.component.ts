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

  constructor(private _organisationService: OrganisationService,
              private _eventService: EventService) {
  }

  ngOnInit(): void {
    this.getSuggestionOrganisation();
  }

  private getSuggestionOrganisation() {
    // TODO: getSuggestionOrganisation
    this._organisationService.getAllOrganisation().subscribe({
      next: organisations => {
        this.listOrganisation$ = organisations;
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

}
