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

  createPost(post: Post) {
    return this.http.post<Post>(`${environment.baseUrl}/post`, post);
  }

  getTimeline(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/timeline/0/0`);
  }

  getPostLikes(postId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/post/${postId}/likes`);
  }

  isPostLiked(postId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/post/${postId}/is-liked`);
  }

  likePost(postId: string): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/post/${postId}/like`);
  }

  dislikePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/post/${postId}/like`);
  }
}
