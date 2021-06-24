import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) { }

  postFriendship(username: string, us){
    this.http.post(`${environment.baseUrl}/friendship/${username}`, null).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  rejectFriendship(username: string){
    this.http.delete(`${environment.baseUrl}/friendship/${username}/reject`).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  removeFriendship(username: string){
    this.http.delete(`${environment.baseUrl}/friendship/${username}/remove`).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }

  putFriendship(username: string){
    this.http.put(`${environment.baseUrl}/friendship/${username}`, null, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }
}
