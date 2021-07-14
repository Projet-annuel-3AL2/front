import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MapService} from "../../../services/map/map.service";

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {

  @Input()
  event: Event = new Event();
  isFollowing: boolean = false;
  address:any;

  constructor(private _organisationService: OrganisationService,
              public _authService: AuthService,
              public _mapService: MapService,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this._mapService.getAddressFromLatLng(this.event.latitude, this.event.longitude).subscribe(address=>this.address=address);
  }


  // this._organisationService.getMembersOrga(this.event.organisation.id).subscribe({
  //   next: organisationMemberships => {
  //     organisationMemberships.forEach(organisationMembership => {
  //       this.listUser.push(organisationMembership.user)
  //     })
  //   },
  //   error: error => {
  //     if (!environment.production) {
  //       console.error('Error: ', error);
  //     }
  //   }
  // })

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

}
