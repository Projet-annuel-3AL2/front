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
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private http: HttpClient) { }

  postEvent(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.baseUrl}/event/`, newEvent, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  postAddParticipant(eventId: string): Observable<Object> {
    return this.http.post<any>(`${environment.baseUrl}/event/${eventId}/join`,  {headers: {'Access-Control-Allow-Origin': '*'}});
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

  deleteParticipation(eventId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/${eventId}/participant`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  deleteParticipantEvent(eventId: string, userId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/${eventId}/participant/${userId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  putEvent(event: Event): Observable<Event>{
    return this.http.put<Event>(`${environment.baseUrl}/event/${event.id}`, event, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/event/${eventId}/getMembers`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getNotEndEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/is-finished`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getEventPosts(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/event/${eventId}/posts`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }



  getEventOrganisationMembership(eventId: string): Observable<OrganisationMembership[]>{
    return this.http.get<OrganisationMembership[]>(`${environment.baseUrl}/event/getOrganisationMembership/${eventId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }


  // TODO : Les fonctions sont implémenter dans l'api mais je suis pas sur qu'on s'en serve vue qu'il serait mieux de faire la fonction getEventWithRecherche pour filter
  getEventWithUserLocation(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocation/${userLocationX}/${userLocationY}/${range}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }
  getEventWithUserLocationNotEnd(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocationNotEnd/${userLocationX}/${userLocationY}/${range}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }
  getUserRechercheNameEvent(userRecherche: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.baseUrl}/event/userRechercheNameEvent/${userRecherche}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getEventWithRecherche(rechercheEvent: RechercheEventModel): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getSuggestion(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/suggestions/events`);
  }

  getProfil(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}/profil`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/event/${id}/report`, report, {headers: {'Access-Control-Allow-Origin': '*'}})
  }
}
//
