import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {Observable} from "rxjs";
import {FriendRequestStatus} from "../../shared/FriendshipRequestStatus.enum";
import {Friendship} from "../../shared/models/friendship.model";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) { }

  postFriendship(userId: string): Observable<Friendship>{
    return this.http.post<Friendship>(`${environment.baseUrl}/friendship/${userId}`, null);
  }

  acceptFriendship(userId: string): Observable<Friendship> {
    return this.http.put<Friendship>(`${environment.baseUrl}/friendship/${userId}`, null);
  }

  rejectFriendship(userId: string){
    return this.http.delete(`${environment.baseUrl}/friendship/${userId}/reject`)
  }

  removeFriendship(userId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/friendship/${userId}/remove`);
  }

  putFriendship(userId: string){
    this.http.put(`${environment.baseUrl}/friendship/${userId}`, null).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  isFriendshipRequested(userId: string, userSessionId: string): Observable<FriendRequestStatus> {
    return this.http.get<FriendRequestStatus>(`${environment.baseUrl}/friendship/${userId}/${userSessionId}`)
  }

  isFriendship(userId: string, userSessionId: string): Observable<boolean> {
    return  this.http.get<boolean>(`${environment.baseUrl}`)// TODO : url à remplacer
  }
}
