import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../shared/models/event.model";
import {UserService} from "../../../services/user/user.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {faCheckCircle, faClock, faMapMarked, faTags, faUser} from '@fortawesome/free-solid-svg-icons';
import {MapService} from "../../../services/map/map.service";

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input("event") event: Event = new Event();
  faCheckCircle = faCheckCircle;
  faUser = faUser;
  faClock = faClock;
  faTags = faTags;
  faMapMarked = faMapMarked;

  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _mapService: MapService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  getLocalisation() {
     this._mapService.getAddressFromLatLng(this.event.latitude, this.event.longitude)
       .toPromise()
       .then(address=>this.event.address=address);
  }


  async joinEvent(id: string) {
    this._eventService.joinEvent(id).toPromise().then(() => this.event.isMember = true);
  }

  leaveEvent(id: string) {
    this._eventService.leaveEvent(id).toPromise().then(() => this.event.isMember = false);
  }

  async canJoin() {
    this.event.isMember = await this._eventService.isMember(this.event.id).toPromise();
  }

  private async getEvent() {
    this.event = await this._eventService.getProfile(this.event.id).toPromise();
  }

  private updateData() {
    this.getEvent().then();
    this.getLocalisation();
    this.canJoin().then();
  }

  isEnd(): boolean {
    return new Date(this.event.endDate) > new Date(Date.now())
  }
}
