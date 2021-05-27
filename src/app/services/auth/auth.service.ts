import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

  public register(mail: string, username: string, password: string){
    return this.http.post<User>(`${environment.baseUrl}/auth/register`, { username, password, mail },{headers: {'Access-Control-Allow-Origin': '*'},withCredentials: true})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user.id));
        this.userSubject.next(user);
        return user;
      }));
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/auth/login`, { username, password }, {withCredentials: true})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user.id));
        this.userSubject.next(user);
        return user;
      }));
  }

  public logout() {
    return this.http.delete(`${environment.baseUrl}/auth/logout`)
      .subscribe(()=>{
        localStorage.removeItem('user');
        this.userSubject.next(null);
      });
  }

  public isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return user !== null && user !== undefined && user !== "";
  }
}
