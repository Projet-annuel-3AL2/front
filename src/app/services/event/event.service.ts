import { Injectable } from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {UserService} from "../user/user.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

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
    return this.http.get<Event[]>(`${environment.baseUrl}/event/notEndEvent`);
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
}
