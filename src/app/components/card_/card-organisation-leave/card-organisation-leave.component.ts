import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card-organisation-leave',
  templateUrl: './card-organisation-leave.component.html',
  styleUrls: ['./card-organisation-leave.component.css']
})
export class CardOrganisationLeaveComponent implements OnInit {

  @Input('organisation') organisation: Organisation;

  constructor(private _organisationService: OrganisationService) { }

  ngOnInit(): void {
  }

  leaveOrganisation(): void{
    this._organisationService.leave(this.organisation.id).subscribe({
      error: err => {
        if (!environment.apiBaseUrl){
          console.error(err)
        }
      }
    })
  }
}
