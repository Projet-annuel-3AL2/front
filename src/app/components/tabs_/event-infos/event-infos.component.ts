import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import * as L from 'leaflet';
import {LeafletMouseEvent} from "leaflet";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {EventService} from "../../../services/event/event.service";
import {User} from "../../../shared/models/user.model";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-event-infos',
  templateUrl: './event-infos.component.html',
  styleUrls: ['./event-infos.component.css']
})
export class EventInfosComponent implements OnInit {

  @Input('event') event : Event = new Event();
  @Input('userSession') userSession: User;
  @Input('participantsNumber') participantNumber: number;
  organisation$: Organisation;
  listUser: User[] = [];
  isFollowing: boolean = false;

  constructor(private _organisationService: OrganisationService,
              private _userService: UserService) {

  }

  ngOnInit(): void {
    this.organisation$ = this.event.organisation;
    this.getOrganisationMembers();
  }

  private getOrganisationMembers() {
    this._organisationService.getMemberOrganisation(this.event.organisation.id).subscribe({
      next: users => {
        this.listUser = users;
        this.canFollow();
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }
    canFollow() {
      this._userService.isFollowingOrganisation(this.organisation$.id).subscribe({
        next: bool =>{
          this.isFollowing = bool;
        },
        error: error => {
          if (!environment.production){
            console.error('There was an error!', error);
          }
        }
      })
    }

    followOrganisation() {
      this._organisationService.followOrganisation(this.organisation$.id).subscribe({
        next: () =>{
          this.isFollowing = true;
          console.log(this.isFollowing)
        },
        error: error => {
          if (!environment.production){
            console.error('There was an error!', error);
          }
        }
      })
    }

    unfollowOrganisation() {
      this._organisationService.unfollowOrganisation(this.organisation$.id).subscribe({
        next: () =>{
          this.isFollowing = false;
          console.log(this.isFollowing)
        },
        error: error => {
          if (!environment.production){
            console.error('There was an error!', error);
          }
        }
      })
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
