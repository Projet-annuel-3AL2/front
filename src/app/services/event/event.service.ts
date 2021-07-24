import {Injectable} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {UserService} from "../user/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {Search_eventModel} from "../../shared/models/search_event.model";
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";
import {Category} from "../../shared/models/category.model";
import {Organisation} from "../../shared/models/organisation.model";
import {AuthService} from "../auth/auth.service";
import {SearchEventProps} from "../../components/event-filter/event-filter.component";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private _authService: AuthService,
              private http: HttpClient) {
  }

  createEvent(newEvent: Event, file: File): Observable<Event> {
    const formData = new FormData();

    formData.append("name", JSON.stringify(newEvent.name));
    formData.append("description", JSON.stringify(newEvent.description));
    formData.append("user", JSON.stringify(newEvent.user));
    formData.append("startDate", JSON.stringify(newEvent.startDate.toString()));
    formData.append("endDate", JSON.stringify(newEvent.endDate.toString()));
    formData.append("latitude", JSON.stringify(newEvent.latitude));
    formData.append("longitude", JSON.stringify(newEvent.longitude));
    formData.append("participantsLimit", JSON.stringify(newEvent.participantsLimit));
    formData.append("category", JSON.stringify(newEvent.category));
    if (newEvent.organisation !== undefined) {
      formData.append("organisation", JSON.stringify(newEvent.organisation));
    }
    if (file !== undefined) {
      formData.append("event_media", file);
    }
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/`, formData);
  }

  joinEvent(eventId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/event/${eventId}/join`, {});
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${eventId}`);
  }

  deleteEvent(eventId: string) {
    this.http.delete(`${environment.apiBaseUrl}/event/${eventId}`, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production) {
          console.error('There was an error!', error);
        }
      }
    })
  }

  leaveEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/event/${eventId}/participant`);
  }

  deleteParticipantEvent(eventId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/event/${eventId}/participant/${userId}`);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${environment.apiBaseUrl}/event/${event.id}`, event);
  }

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/participants`);
  }

  isEventFinished(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/is-finished`);
  }

  getEventPosts(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/event/${eventId}/posts`);
  }

  // TODO : Les fonctions sont implémenter dans l'api mais je suis pas sur qu'on s'en serve vue qu'il serait mieux de faire la fonction getEventWithRecherche pour filter
  getEventWithUserLocation(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/getEventWithUserLocation/${userLocationX}/${userLocationY}/${range}`);
  }

  getEventWithUserLocationNotEnd(userLocationX: string, userLocationY: string, range: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/getEventWithUserLocationNotEnd/${userLocationX}/${userLocationY}/${range}`);
  }

  getUserRechercheNameEvent(userRecherche: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/userRechercheNameEvent/${userRecherche}`);
  }

  searchEvents(rechercheEvent: Search_eventModel): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/`);
  }

  getSuggestion(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/suggestions/events`);
  }

  getProfile(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${eventId}/profil`);
  }

  reportEvent(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/event/${id}/report`, report)
  }

  getOwner(eventId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/event/${eventId}/owner`);
  }

  getCategory(eventId: string) {
    return this.http.get<Category>(`${environment.apiBaseUrl}/event/${eventId}/category`);
  }

  getOrganisation(eventId: string) {
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/event/${eventId}/organisation`);
  }

  getParticipants(eventId: string) {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/participants`);
  }

  isMember(eventId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/${eventId}/is-member`);
  }

  isOwner(eventId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/${eventId}/is-owner`);
  }

  getEventsSearch(searchEventProps: SearchEventProps): Observable<Event[]> {
    return this.http.post<Event[]>(
      `${environment.apiBaseUrl}/event/search-event`, searchEventProps);
  }
}

//
