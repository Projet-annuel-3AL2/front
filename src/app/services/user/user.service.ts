import {Injectable} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conversation} from "../../shared/models/conversation.model";
import {environment} from "../../../environments/environment";
import {Group} from "../../shared/models/group.model";
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${username}`);
  }

  getGroups(username: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.baseUrl}/user/${username}/groups`);
  }

  getPosts(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/user/${username}/posts`)
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/user/${username}`)
  }

  // TODO: getUserFriends() pas implémenter sur l'API
  getUserFriends(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/user/getFriendship/${username}`);
  }

  putUser(user: User): Observable<any> {
    return this.http.put(`${environment.baseUrl}/user/${user.username}`, user);
  }

  getParticipations(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/user/${username}/participation`);
  }

  getFriends(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/user/${username}/friends`)
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.baseUrl}/user/conversations`);
  }

  isFollowingOrganisation(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/user/is-following-orga/${id}`)
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/user/${id}/report`, report)
  }
}
