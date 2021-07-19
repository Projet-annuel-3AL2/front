import {Injectable} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Conversation} from "../../shared/models/conversation.model";
import {environment} from "../../../environments/environment";
import {Group} from "../../shared/models/group.model";
import {Post} from "../../shared/models/post.model";
import {Report} from "../../shared/models/report.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${username}`)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  getGroups(username: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/user/${username}/groups`);
  }

  getPosts(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/user/${username}/posts`)
      .pipe(map(posts => {
        let user = this.userSubject.getValue();
        user.createdPosts = posts;
        this.userSubject.next(user);
        return posts;
      }));
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/user/${username}`)
  }

  // TODO: getUserFriends() pas implémenter sur l'API
  getUserFriends(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/getFriendship/${username}`);
  }

  putUser(oldUsername: string, username: string, bio:string, firstname:string, lastname:string, mail:string, profilePicture:File, bannerPicture:File): Observable<User> {
    const formData = new FormData();
    if (username !== undefined && username !== null) {
      formData.append("username", username);
    }
    if (bio !== undefined && bio !== null) {
      formData.append("bio", bio);
    }
    if (firstname !== undefined && firstname !== null) {
      formData.append("firstname", firstname);
    }
    if (lastname !== undefined && lastname !== null) {
      formData.append("lastname", lastname);
    }
    if (mail !== undefined && mail !== null) {
      formData.append("mail", mail);
    }
    if (profilePicture !== undefined && profilePicture !== null) {
      formData.append("profilePicture", profilePicture);
    }
    if (bannerPicture !== undefined && bannerPicture !== null) {
      formData.append("bannerPicture", bannerPicture);
    }
    return this.http.put<User>(`${environment.apiBaseUrl}/user/${oldUsername}`, formData);
  }

  getParticipations(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/user/${username}/participation`)
      .pipe(map(participations => {
        let user = this.userSubject.getValue();
        user.eventsParticipation = participations;
        this.userSubject.next(user);
        return participations;
      }));
  }

  getFriends(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/${username}/friends`)
      .pipe(map(friends => {
        let user = this.userSubject.getValue();
        user.friends = friends;
        this.userSubject.next(user);
        return friends;
      }));
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
}
