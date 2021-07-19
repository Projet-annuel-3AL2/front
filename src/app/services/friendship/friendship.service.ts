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
  public friendRequests: Observable<FriendRequest[]>;
  public sentFriendRequests: Observable<FriendRequest[]>;
  private friendRequestsSubject: BehaviorSubject<FriendRequest[]>;
  private sentFriendRequestsSubject: BehaviorSubject<FriendRequest[]>;

  constructor(private http: HttpClient) {
    this.sentFriendRequestsSubject = new BehaviorSubject<FriendRequest[]>(null);
    this.sentFriendRequests = this.sentFriendRequestsSubject.asObservable();

    this.friendRequestsSubject = new BehaviorSubject<FriendRequest[]>(null);
    this.friendRequests = this.friendRequestsSubject.asObservable();
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

  getSentFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/sent-friendship-request`).pipe(map(requests => {
      this.sentFriendRequestsSubject.next(requests);
      return requests;
    }));
  }

  getReceivedFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/received-friendship-request`).pipe(map(requests => {
      this.friendRequestsSubject.next(requests);
      return requests;
    }));
  }

}
