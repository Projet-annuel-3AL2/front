import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {FriendRequestStatus} from "../../shared/FriendshipRequestStatus.enum";
import {Friendship} from "../../shared/models/friendship.model";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) {
  }

  sendFriendRequest(username: string): Observable<Friendship> {
    return this.http.post<Friendship>(`${environment.baseUrl}/friendship/${username}`, null, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  acceptFriendship(username: string): Observable<Friendship> {
    return this.http.put<Friendship>(`${environment.baseUrl}/friendship/${username}`, null, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  rejectFriendRequest(username: string) {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/reject`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  removeFriendship(username: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/remove`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  cancelFriendRequest(username: string) {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/cancel`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }
  isFriendshipRequested(username: string): Observable<FriendRequestStatus> {
    return this.http.get<FriendRequestStatus>(`${environment.baseUrl}/friendship/${username}/friendship-status`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  getSentFriendshipRequest(): Observable<Friendship> {
    return this.http.get<Friendship>(`${environment.baseUrl}/friendship/sent-friendship-request`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

}
