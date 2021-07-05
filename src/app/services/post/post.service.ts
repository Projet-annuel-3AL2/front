import { Injectable } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {Event} from "../../shared/models/event.model";
import {User} from "../../shared/models/user.model";
import {Organisation} from "../../shared/models/organisation.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Certification} from "../../shared/models/certification.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) {
  }

  getPostById(postId: string): Observable<Post>{
    return this.http.get<Post>(`${environment.baseUrl}/post/${postId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getAllPost(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/post/`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getLikePostById(postId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/${postId}/likes`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  deletePost(postId: string) {
    this.http.delete(`${environment.baseUrl}/${postId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  createPost(post: Post) {
    return this.http.post<Post>(`${environment.baseUrl}/post`, post, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  updatePost(post: Post){
    this.http.put(`${environment.baseUrl}/post/`, JSON.stringify(post), {headers: {'Access-Control-Allow-Origin': '*'}}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  // TODO : getPostByEventId() à implementer sur L'API
  getPostWithEventId(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/getPostWithEventId/${eventId}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getPostWithOrgaName(organisationName: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/post/getPostsOrganisation/${organisationName}`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  getTimeline(userId): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/timeline/0/0`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

}
