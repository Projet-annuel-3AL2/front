import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {EventService} from "../event/event.service";
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Organisation} from "../../shared/models/organisation.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {Certification} from "../../shared/models/certification.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conversation} from "../../shared/models/conversation.model";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private _authService: AuthService) {
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.baseUrl}/user/${this._authService.getCurrentUserId()}/conversations`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getById(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${userId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  // TODO : getByName() pas implémenter sur l'API
  getByName(username: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/getWithUsername/${username}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  // TODO: getUserFriends() pas implémenter sur l'API
  getUserFriends(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/user/getFriendship/${userId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getFullUser(username: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/getFullUser/${username}`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }
}
//
