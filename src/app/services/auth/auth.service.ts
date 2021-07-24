import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, timer} from "rxjs";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";
import {Event} from "../../shared/models/event.model";
import {Organisation} from "../../shared/models/organisation.model";
import {FriendRequest} from "../../shared/models/FriendRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    timer(0, 30000).subscribe(async () => await this.updateUser());
  }

  async updateUser() {
    if (this.getCurrentUsername()) {
      await this.getCurrentUser().toPromise();
    }
    if (this.getCurrentUsername() && this.userSubject.getValue()) {
      await this.getParticipations().toPromise();
      await this.getFriends().toPromise();
      await this.getInvitationsOrganisation().toPromise();
      await this.getOrganisations().toPromise();
      await this.getReceivedFriendshipRequest().toPromise();
      await this.getSentFriendshipRequest().toPromise();
    }
  }

  getReceivedFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/received-friendship-request`)
      .pipe(map(requests => {
      let user = this.userSubject.getValue();
      user.friendRequests = requests;
      this.userSubject.next(user);
      return requests;
    }));
  }


  getSentFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/sent-friendship-request`)
      .pipe(map(requests => {
      let user = this.userSubject.getValue();
      user.sentFriendRequests = requests;
      this.userSubject.next(user);
      return requests;
    }));
  }

  public register(mail: string, username: string, password: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/register`, {
      username,
      password,
      mail
    })
      .pipe(map(user => {
        this.cookieService.set('user', user.username, 3, "", environment.domain, false, 'Strict');
        this.updateUser();
        return user;
      }));
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, {
      username,
      password
    })
      .pipe(map(user => {
        this.cookieService.set('user', user.username, 3, "", environment.domain, false, 'Strict');
        this.updateUser();
        return user;
      }));
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${this.getCurrentUsername()}`)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  getParticipations(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/user/${this.getCurrentUsername()}/participation`)
      .pipe(map(participations => {
        let user = this.userSubject.getValue();
        if (user) {
          user.eventsParticipation = participations;
          this.userSubject.next(user);
        }
        return participations;
      }));
  }

  public getFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/${this.getCurrentUsername()}/friends`)
      .pipe(map(friends => {
        let user = this.userSubject.getValue();
        if (user) {
          user.friends = friends;
          this.userSubject.next(user);
        }
        return friends;
      }));
  }


  getInvitationsOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/user/organisation/invitations`)
      .pipe(map(organisationInvitations => {
        let user = this.userSubject.getValue();
        user.organisationInvitations = organisationInvitations;
        this.userSubject.next(user);
        return organisationInvitations;
      }));
  }

  getOrganisations(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/user/${this.getCurrentUsername()}/organisations`)
      .pipe(map(organisations => {
        let user = this.userSubject.getValue();
        user.organisations = organisations;
        this.userSubject.next(user);
        return organisations;
      }));
  }

  public forgotPassword(username: string): Observable<void> {
    return this.http.get<void>(`${environment.apiBaseUrl}/auth/forgot-password/${username}`);
  }

  public isValidToken(resetToken: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/auth/is-valid-token/${username}/${resetToken}`);
  }

  public resetPassword(resetToken: string, username: string, password: string) {
    return this.http.post<void>(`${environment.apiBaseUrl}/auth/reset-password/${username}/${resetToken}`, {password});
  }

  public logout(): Observable<unknown> {
    this.userSubject.next(null);
    this.cookieService.delete('user');
    return this.http.delete(`${environment.apiBaseUrl}/auth/logout`);
  }

  public isAuthenticated(): boolean {
    const username = this.getCurrentUsername();
    return username !== null && username !== undefined && username !== "";
  }

  public getCurrentUsername(): string {
    return this.cookieService.get('user');
  }
}
