import { Injectable } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {Event} from "../../shared/models/event.model";
import {User} from "../../shared/models/user.model";
import {Organisation} from "../../shared/models/organisation.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) {
  }

  getPostById(postId: string): Observable<Post>{
    return this.http.get<Post>(`${environment.baseUrl}/post/` + postId);
  }

  getAllPost(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/post/`);
  }

  getLikePostById(postId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/` + postId + `/likes`);
  }

  deletePost(postId: string) {
    this.http.delete(`${environment.baseUrl}/`+ postId);
  }

  postPost(newPost: Post) {
    this.http.post<Post>(`${environment.baseUrl}/post/`, JSON.stringify(newPost)).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  updatePost(post: Post){
    this.http.put(`${environment.baseUrl}/post/`, JSON.stringify(post)).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  //TODO : getPostByUserId()
  getPostByUsername(username: string): Observable<Post[]> {
    return this.getAllPost();
  }

  // TODO : getPostByEventId()
  getPostByEventId(eventId: string): Observable<Post[]> {
    return this.getAllPost();
  }
}
