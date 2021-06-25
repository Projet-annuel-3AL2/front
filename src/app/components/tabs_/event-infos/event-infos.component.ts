import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import * as L from 'leaflet';
import {LeafletMouseEvent} from "leaflet";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {EventService} from "../../../services/event/event.service";
import {User} from "../../../shared/models/user.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {

  @Input('event') event : Event = new Event();
  organisation$: Organisation;
  listMembers$: User[];
  constructor(private _organisationService: OrganisationService) {

  }

  ngOnInit(): void {
    this.getOrganisationMembers();
  }


   // getMap() {
   //  let map = L.map('eventInfoMap').setView([this.event_.latitude, this.event_.latitude], 13);
   //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
   //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   //     maxZoom: 18,
   //     id: 'mapbox/streets-v11',
   //     tileSize: 512,
   //     zoomOffset: -1,
   //     accessToken: 'your.mapbox.access.token'
   //   }).addTo(map);
  // }

  // TODO: Part du principe que Organisation se trouve dans la variable event
  private getOrganisationMembers() {
    this._organisationService.getOrganisationMembership(this.event.organisation.name).subscribe({
      next: listOrganisationMembership => {
        listOrganisationMembership.forEach(member =>{
          this.listMembers$.push(member.user)
        })
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }


}
