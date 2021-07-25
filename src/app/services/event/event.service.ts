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
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private userService: UserService,
              private _authService: AuthService,
              private http: HttpClient) {
  }

  createEvent(newEvent: FormGroup, file: File, latitude: number, longitude: number, organisation?: Organisation): Observable<Event> {
    let formData = new FormData();
    formData.append("name", newEvent.value.name);
    formData.append("description", newEvent.value.description);
    formData.append("startDate", newEvent.value.startDate.toString());
    formData.append("endDate", newEvent.value.endDate.toString());
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());
    formData.append("participantsLimit", newEvent.value.participationLimit.toString());
    formData.append("category", newEvent.value.category);
    console.log(newEvent.value.category)
    if (organisation) {
      formData.append("organisation", organisation.id);
    }
    if (file) {
      formData.append("event_media", file);
    }
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/`, formData);
  }

  updateEvent(eventId: string, event: FormGroup, file: File): Observable<Event> {
    let formData = new FormData();
    formData.append("name", event.value.name);
    formData.append("description", event.value.description);
    formData.append("startDate", event.value.startDate.toString());
    formData.append("endDate", event.value.endDate.toString());
    formData.append("latitude", event.value.latitude.toString());
    formData.append("longitude", event.value.longitude.toString());
    formData.append("participantsLimit", event.value.participantsLimit.toString());
    formData.append("category", event.value.category.id);

    if (file !== null) {
      formData.append("event_media", file);
    }
    return this.http.put<Event>(`${environment.apiBaseUrl}/event/${eventId}`, formData);
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

  getEventMembers(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/participants`);
  }

  isEventFinished(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/is-finished`);
  }

  getEventPosts(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/event/${eventId}/posts`);
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
