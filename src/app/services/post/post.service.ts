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
    return this.http.get<Post>(`${environment.baseUrl}/post/${postId}`);
  }

  getAllPost(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/post/`);
  }

  getLikePostById(postId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/${postId}/likes`);
  }

  deletePost(postId: string) {
    this.http.delete(`${environment.baseUrl}/${postId}`, {withCredentials: true});
  }

    // TODO : commande identique
  postPost(newPost: Post) {
    this.http.post<Post>(`${environment.baseUrl}/post/`, JSON.stringify(newPost), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
    createPost(post: Post) {
    return this.http.post<Post>(`${environment.baseUrl}/post`, post);
  }

  updatePost(post: Post){
    this.http.put(`${environment.baseUrl}/post/`, JSON.stringify(post), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  //TODO : getPostByUserName() à implementer sur l'API
  getPostWithUsername(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/getPostWithUsername/${username}`);
  }

  // TODO : getPostByEventId() à implementer sur L'API
  getPostWithEventId(eventId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/getPostWithEventId/${eventId}`);
  }
}
