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

  putUser(user: User, updatedProfilePicture: File, updatedBannerPicture: File): Observable<User> {
    const formData = new FormData();
    if (user.mail == null){
      formData.append("mail", user.mail);
    }
    if (user.firstname == null){
      formData.append("firstname", user.firstname);
    }
    if (user.lastname){
      formData.append("lastname", user.lastname);
    }
    if (user.bio){
      formData.append("bio", user.bio);
    }
    if (updatedProfilePicture !== null) {
      formData.append("profilePicture", updatedProfilePicture);
    }
    if (updatedBannerPicture !== null) {
      formData.append("bannerPicture", updatedBannerPicture);
    }
    return this.http.put<User>(`${environment.apiBaseUrl}/user/`, formData);
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

  block(username: string): Observable<void> {
    return this.http.put<boolean>(`${environment.apiBaseUrl}/user/${username}/block`, {}).pipe(map(() => {
      let user = this.userSubject.getValue();
      user.isBlocked = true;
      this.userSubject.next(user);
    }));
  }

  unblock(username: string): Observable<void> {
    return this.http.delete<boolean>(`${environment.apiBaseUrl}/user/${username}/unblock`, {}).pipe(map(() => {
      let user = this.userSubject.getValue();
      user.isBlocked = false;
      this.userSubject.next(user);
    }));
  }

  hasBlocked(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/${username}/has-blocked`, {}).pipe(map(isBlocked => {
      let user = this.userSubject.getValue();
      user.isBlocked = isBlocked;
      this.userSubject.next(user);
      return isBlocked;
    }));
  }

  isBlocked(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/${username}/is-blocked`, {}).pipe(map(blocksCurrentUser => {
      let user = this.userSubject.getValue();
      user.blocksCurrentUser = blocksCurrentUser;
      this.userSubject.next(user);
      return blocksCurrentUser;
    }));
  }
}
