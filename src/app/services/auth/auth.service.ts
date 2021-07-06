import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private _userService: UserService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

  public register(mail: string, username: string, password: string) {
    return this.http.post<User>(`${environment.baseUrl}/auth/register`, {
      username,
      password,
      mail
    })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user.username));
        this.userSubject.next(user);
        return user;
      }));
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/auth/login`, {
      username,
      password
    }, {headers: {'Access-Control-Allow-Origin': '*'}})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user.username));
        this.userSubject.next(user);
        return user;
      }));
  }

  public logout(): Observable<unknown> {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    return this.http.delete(`${environment.baseUrl}/auth/logout`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  public isAuthenticated(): boolean {
    const username = this.getCurrentUsername();
    return username !== null && username !== undefined && username !== "";
  }

  public getCurrentUsername(): string {
    return JSON.parse(localStorage.getItem('user'));
  }

}
