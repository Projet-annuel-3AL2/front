import { Injectable } from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {User} from "../../shared/models/user.model";
import {Organisation} from "../../shared/models/organisation.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {UserService} from "../user/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private http: HttpClient) { }

  postEvent(newEvent: Event) {
    this.http.post<Event>(`${environment.baseUrl}/event/`, JSON.stringify(newEvent)).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  postAddParticipant(userId: string, eventId: string) {
    this.http.post<any>(`${environment.baseUrl}/event/addParticiapnt`, {userId, eventId}).subscribe({
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
    return this.http.get<Event[]>(`${environment.baseUrl}/event/notEndEvent`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/` + eventId);
  }

  // TODO : Problème avec Body en paramètre
  getEventWithUserLocation(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    const bodyContent = {      userLocationX,
      userLocationY,
      range,}
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocation`);
  }

  // TODO : Problème avec Body en paramètre
  getEventWithUserLocationNotEnd(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    const bodyContent = {      userLocationX,
      userLocationY,
      range,}
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocationNotEnd`);
  }

  getUserRechercheNameEvent(userRecherche: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.baseUrl}/event/userRechercheNameEvent/`+ userRecherche);
  }

  deleteEvent(eventId: string) {
    this.http.delete(`${environment.baseUrl}/event/`+ eventId).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  // TODO : Problème avec Body en paramètre
  deleteParticipantEvent(eventId: string, userId: string) {
    this.http.delete(`${environment.baseUrl}/event/`+ eventId).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  updateEvent(event: Event){
    this.http.put(`${environment.baseUrl}/event/`, JSON.stringify(event)).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  //TODO : getEventWithFilter()
  getEventWithFilter(): Observable<Event[]>{
    return this.getAllEvent();
  }
}
