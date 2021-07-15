import {Injectable} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {UserService} from "../user/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {Search_eventModel} from "../../shared/models/search_event.model";
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";
import {map} from "rxjs/operators";
import {Category} from "../../shared/models/category.model";
import {Organisation} from "../../shared/models/organisation.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public event: Observable<Event>;
  private eventSubject: BehaviorSubject<Event>;

  constructor(private userService: UserService,
              private http: HttpClient) {
    this.eventSubject = new BehaviorSubject<Event>(null);
    this.event = this.eventSubject.asObservable();
  }

  createEvent(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/`, newEvent);
  }

  joinEvent(eventId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/event/${eventId}/join`, {}).pipe(map(() => {
      let event = this.eventSubject.getValue();
      event.isMember = true;
      this.eventSubject.next(event);
    }));
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${eventId}`)
      .pipe(map(event => {
        this.eventSubject.next(event);
        return event;
      }));
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
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/getMembers`);
  }

  isEventFinished(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/is-finished`);
  }

  getEventPosts(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/event/${eventId}/posts`).pipe(map(posts => {
      let event = this.eventSubject.getValue();
      event.posts = posts;
      this.eventSubject.next(event);
      return posts;
    }));
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
    return this.http.get<User>(`${environment.apiBaseUrl}/event/${eventId}/owner`).pipe(map(owner => {
      let event = this.eventSubject.getValue();
      event.owner = owner;
      this.eventSubject.next(event);
      return owner;
    }));
  }

  getCategory(eventId: string) {
    return this.http.get<Category>(`${environment.apiBaseUrl}/event/${eventId}/category`).pipe(map(category => {
      let event = this.eventSubject.getValue();
      event.category = category;
      this.eventSubject.next(event);
      return category;
    }));
  }

  getOrganisation(eventId: string) {
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/event/${eventId}/organisation`).pipe(map(organisation => {
      let event = this.eventSubject.getValue();
      event.organisation = organisation;
      this.eventSubject.next(event);
      return organisation;
    }));
  }

  getParticipants(eventId: string) {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/${eventId}/participants`).pipe(map(participants => {
      let event = this.eventSubject.getValue();
      event.participants = participants;
      this.eventSubject.next(event);
      return participants;
    }));
  }

  isMember(eventId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/${eventId}/is-member`).pipe(map(isMember => {
      if(this.eventSubject.getValue()) {
        let event = this.eventSubject.getValue();
        event.isMember = isMember;
        this.eventSubject.next(event);
      }
      return isMember;
    }));
  }

  isOwner(eventId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/${eventId}/is-owner`).pipe(map(isOwner => {
      if(this.eventSubject.getValue()) {
        let event = this.eventSubject.getValue();
        event.isOwner = isOwner;
        this.eventSubject.next(event);
      }
      return isOwner;
    }));
  }
}

//
