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
    return this.http.post<Friendship>(`${environment.baseUrl}/friendship/${username}`, {});
  }

  acceptFriendship(username: string): Observable<Friendship> {
    return this.http.put<Friendship>(`${environment.baseUrl}/friendship/${username}`, {});
  }

  rejectFriendRequest(username: string) {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/reject`);
  }

  removeFriendship(username: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/remove`);
  }

  cancelFriendRequest(username: string) {
    return this.http.delete(`${environment.baseUrl}/friendship/${username}/cancel`);
  }

  isFriendshipRequested(username: string): Observable<FriendRequestStatus> {
    return this.http.get<FriendRequestStatus>(`${environment.baseUrl}/friendship/${username}/friendship-status`);
  }

  getSentFriendshipRequest(): Observable<Friendship> {
    return this.http.get<Friendship>(`${environment.baseUrl}/friendship/sent-friendship-request`);
  }

}
