import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, timer} from "rxjs";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    timer(0, 30000).subscribe(() => this.updateUser());
  }

  updateUser() {
    if (this.getCurrentUsername()) {
      this.getCurrentUser().subscribe();
    }
  }

  public register(mail: string, username: string, password: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/register`, {
      username,
      password,
      mail
    })
      .pipe(map(user => {
        this.cookieService.set('user', user.username,3,"",environment.domain,false,'Strict');
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
        this.cookieService.set('user', user.username,3,"",environment.domain,false,'Strict');
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
