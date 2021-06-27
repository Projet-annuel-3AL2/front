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
import {RechercheEventModel} from "../../shared/models/rechercheEvent.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private http: HttpClient) { }

  postEvent(newEvent: Event) {
    this.http.post<Event>(`${environment.baseUrl}/event/`, JSON.stringify(newEvent), {headers: {'Access-Control-Allow-Origin': '*'}}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  postAddParticipant(userId: string, eventId: string): Observable<Object> {
    return this.http.post<any>(`${environment.baseUrl}/event/addParticipant`, {userId, eventId}, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
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

  deleteParticipantEvent(eventId: string, userId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/participant/${eventId}/${userId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  putEvent(event: Event){
    this.http.put(`${environment.baseUrl}/event/`, JSON.stringify(event), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  getEventMembers(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}/getMembers`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getNotEndEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/notEndEvent`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }


  //TODO : getEventWithRecherche() A implémenter voire refecto
  getEventWithRecherche(rechercheEvent: RechercheEventModel): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`);
  }
  // TODO : Les fonctions sont implémenter dans l'api mais je suis pas sur qu'on s'en serve vue qu'il serait mieux de faire la fonction getEventWithRecherche pour filter
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

  getEventOrganisationMembership(eventId: string): Observable<OrganisationMembership[]>{
    return this.http.get<OrganisationMembership[]>(`${environment.baseUrl}/event/getOrganisationMembership/${eventId}`);
  }

  getEventFull(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/fullEvent/${eventId}`, {headers: {'Access-Control-Allow-Origin': '*'}});

  }

}
//
