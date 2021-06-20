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

  postPost(newPost: Post) {
    this.http.post<Post>(`${environment.baseUrl}/post/`, JSON.stringify(newPost), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  updatePost(post: Post){
    this.http.put(`${environment.baseUrl}/post/`, JSON.stringify(post), {withCredentials: true}).subscribe({
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



  getRelatedPost(id: string) {
    let posts: Post[];

    posts = [
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id)
    ]
    return posts;
  }

  private getPost(id: string) {
    const post: Post = {
      commentCount: 10,
      comments: [],
      createdAt: undefined,
      creator: new User(),
      event: new Event(),
      group: undefined,
      id: "1",
      likeCount: 100,
      likes: [],
      medias: [],
      organisation: new Organisation('1', 'organisationName', []),
      postShares: undefined,
      shareCount: 8,
      sharedPost: undefined,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commod"
    }
    return post;
  }

  getUserRelatedPost(username: string) {
    return this.getRelatedPost(username);
  }

  getRelatedEventPost(event: Event): Post[] {
    return this.getRelatedPost('as');
  }

  getRelatedUserPost(user: User) {
    return this.getRelatedPost('1');
  }
}
