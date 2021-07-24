import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {FriendRequestStatus} from "../../shared/FriendshipRequestStatus.enum";
import {Friendship} from "../../shared/models/friendship.model";
import {FriendRequest} from "../../shared/models/FriendRequest";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) {
  }

  sendFriendRequest(username: string): Observable<Friendship> {
    return this.http.post<Friendship>(`${environment.apiBaseUrl}/friendship/${username}`, {});
  }

  acceptFriendship(username: string): Observable<Friendship> {
    return this.http.put<Friendship>(`${environment.apiBaseUrl}/friendship/${username}`, {});
  }

  rejectFriendRequest(username: string) {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/${username}/reject`);
  }

  removeFriendship(username: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/${username}/remove`);
  }

  cancelFriendRequest(username: string) {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/${username}/cancel`);
  }

  isFriendshipRequested(username: string): Observable<FriendRequestStatus> {
    return this.http.get<FriendRequestStatus>(`${environment.apiBaseUrl}/friendship/${username}/friendship-status`);
  }
}
