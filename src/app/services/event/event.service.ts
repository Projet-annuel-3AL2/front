import { Injectable } from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {UserService} from "../user/user.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../shared/models/category.model";
import {User} from "../../shared/models/user.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {Organisation} from "../../shared/models/organisation.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private http: HttpClient) { }

  postEvent(newEvent: Event) {
    this.http.post<Event>(`${environment.baseUrl}/event/`, JSON.stringify(newEvent), {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  postAddParticipant(userId: string, eventId: string) {
    this.http.post<any>(`${environment.baseUrl}/event/addParticipant`, {userId, eventId}, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`);
  }

  getNotEndEvent(): Observable<Event[]> {
    return this.getAllEvent();
    // return this.http.get<Event[]>(`${environment.baseUrl}/event_/notEndEvent`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}`);
  }

  getEventWithUserLocation(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocation/${userLocationX}/${userLocationY}/${range}`, {
      withCredentials: true
    });
  }

  getEventWithUserLocationNotEnd(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocationNotEnd/${userLocationX}/${userLocationY}/${range}`, {
      withCredentials: true
    });
  }

  getUserRechercheNameEvent(userRecherche: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.baseUrl}/event/userRechercheNameEvent/${userRecherche}`);
  }

  deleteEvent(eventId: string) {
    this.http.delete(`${environment.baseUrl}/event/${eventId}`, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  deleteParticipantEvent(eventId: string, userId: string) {
    this.http.delete(`${environment.baseUrl}/event/${eventId}/${userId}`, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  putEvent(event: Event){
    this.http.put(`${environment.baseUrl}/event/`, JSON.stringify(event), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  //TODO : getEventWithFilter()
  getEventWithFilter(): Observable<Event[]>{
    return this.getAllEvent();
  }







  getEvent(id: String) {
    const event: Event = {
      id: "1",
      name: "Nettoyage de la plage de Diepe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, " +
        "elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commodo elit ultricies vel. Sed " +
        "interdum mollis sapien, vel dictum ligula consequat in. Nulla nibh enim, sollicitudin id mattis eget, aliquet " +
        "non augue. Nunc eu malesuada erat, ac pulvinar odio. Quisque tempor venenatis vestibulum. Aenean magna lectus, " +
        "vestibulum bibendum nunc id, blandit hendrerit nulla. Vivamus suscipit elementum arcu, nec vestibulum mauris euismod " +
        "vel. Curabitur interdum, mi fermentum mattis lobortis, turpis est bibendum augue, at mattis lorem libero et lacus." +
        " Sed consectetur condimentum turpis, in fermentum lacus porta nec. Ut luctus tincidunt mollis. ",
      category: new Category('1','Nettoyage de plage'),
      creator: new User(),
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1),
      latitude: 49.929118,
      longitude: 1.076918,
      organisation: this.getFakeOrgaMini(),
      participantsLimit: 15,
      picture: undefined,
      participants: this.getParticipants('1')

    }
    return event;
  }

  getEvents() {
    let events = [
      this.getEvent("1"),
      this.getEvent("2"),
      this.getEvent("3"),
      this.getEvent("4")
    ]
    return events;
  }

  getEventFilter() {
    let events = [
      this.getEvent("3"),
      this.getEvent("4")
    ]
    return events;
  }

  getParticipants(id: string) {
    let users: User[];
    users = [
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id)
    ]
    return users;
  }

  getUser(id: string) {
    const user: User = {
      bannerPicture: undefined,
      certification: undefined,
      createdEvents: [],
      createdPosts: [],
      firstname: "firstName",
      id: "1",
      lastname: "lastname",
      likedPosts: [],
      profilePicture: undefined,
      username: "username"
    }
    return user;
  }
  private getFakeOrgaMini() {
    let organisation: Organisation = new Organisation();
    organisation.id = '1';
    organisation.events = this.getEvents();
    organisation.name = 'OrganisationDeBilly';
    organisation.owner = this.getUser('1');
    organisation.bannerPicture = undefined;

    return organisation;
  }
}
