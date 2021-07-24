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
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${username}`);
  }

  getGroups(username: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/user/${username}/groups`);
  }

  getPosts(username: string, limit:number, offset:number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user/${username}/posts/${limit}/${offset}`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/user/${username}`)
  }

  putUser(user: User, updatedProfilePicture: File, updatedBannerPicture: File): Observable<User> {
    const formData = new FormData()
    formData.append("username", user.username);
    formData.append("mail", user.mail);
    formData.append("firstname", user.firstname);
    formData.append("lastname", user.lastname);
    formData.append("bio", user.bio);

    if (updatedProfilePicture !== null) {
      formData.append("profilePicture", updatedProfilePicture)
    }
    if (updatedBannerPicture !== null) {

      formData.append("bannerPicture", updatedBannerPicture)
    }
    return this.http.put<User>(`${environment.apiBaseUrl}/user/`, formData);
  }

  getParticipations(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/user/${username}/participation`);
  }

  getFriends(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/${username}/friends`);
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.apiBaseUrl}/user/conversations`);
  }

  isFollowingOrganisation(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/is-following-orga/${id}`)
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/user/${id}/report`, report)
  }

  block(username: string): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiBaseUrl}/user/${username}/block`, {});
  }

  unblock(username: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiBaseUrl}/user/${username}/unblock`, {});
  }

  hasBlocked(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/${username}/has-blocked`, {});
  }

  isBlocked(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/${username}/is-blocked`, {});
  }
}
