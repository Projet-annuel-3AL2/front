import {Injectable} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {UserService} from "../user/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {Search_eventModel} from "../../shared/models/search_event.model";
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private http: HttpClient) {
  }

  postEvent(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.baseUrl}/event/`, newEvent);
  }

  postAddParticipant(eventId: string): Observable<Object> {
    return this.http.post<any>(`${environment.baseUrl}/event/${eventId}/join`,{});
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}`);
  }

  deleteEvent(eventId: string) {
    this.http.delete(`${environment.baseUrl}/event/${eventId}`, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  deleteParticipation(eventId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/${eventId}/participant`);
  }

  deleteParticipantEvent(eventId: string, userId: string): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/event/${eventId}/participant/${userId}`);
  }

  putEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${environment.baseUrl}/event/${event.id}`, event);
  }

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/event/${eventId}/getMembers`);
  }

  getNotEndEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/is-finished`);
  }

  getEventPosts(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/event/${eventId}/posts`);
  }


  getEventOrganisationMembership(eventId: string): Observable<OrganisationMembership[]> {
    return this.http.get<OrganisationMembership[]>(`${environment.baseUrl}/event/getOrganisationMembership/${eventId}`);
  }


  // TODO : Les fonctions sont implémenter dans l'api mais je suis pas sur qu'on s'en serve vue qu'il serait mieux de faire la fonction getEventWithRecherche pour filter
  getEventWithUserLocation(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocation/${userLocationX}/${userLocationY}/${range}`);
  }

  getEventWithUserLocationNotEnd(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/getEventWithUserLocationNotEnd/${userLocationX}/${userLocationY}/${range}`);
  }

  getUserRechercheNameEvent(userRecherche: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/userRechercheNameEvent/${userRecherche}`);
  }

  getEventWithRecherche(rechercheEvent: Search_eventModel): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/`);
  }

  getSuggestion(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/event/suggestions/events`);
  }

  getProfil(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.baseUrl}/event/${eventId}/profil`);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/event/${id}/report`, report)
  }
}

//
