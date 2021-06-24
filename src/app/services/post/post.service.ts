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

  //TODO : getPostByUserId()
  getPostByUsername(username: string): Observable<Post[]> {
    return this.getAllPost();
  }

  // TODO : getPostByEventId()
  getPostByEventId(eventId: string): Observable<Post[]> {
    return this.getAllPost();
  }



  fakeGetRelatedPost(id: string) {
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
      creator: this.getUser("1"),
      event: new Event(),
      group: undefined,
      id: "1",
      likeCount: 100,
      likes: [],
      medias: [],
      organisation: this.getFakeOrgaMini(),
      postShares: undefined,
      shareCount: 8,
      sharedPost: undefined,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commod"
    }
    return post;
  }

  getUserRelatedPost(username: string) {
    return this.fakeGetRelatedPost(username);
  }

  getRelatedEventPost(event: Event): Post[] {
    return this.fakeGetRelatedPost('as');
  }

  getRelatedUserPost(user: User) {
    return this.fakeGetRelatedPost('1');
  }
  private getFakeOrgaMini() {
    let organisation: Organisation = new Organisation();
    organisation.id = '1';
    organisation.name = 'OrganisationDeBilly';
    organisation.owner = this.getUser('1');
    organisation.bannerPicture = undefined;

    return organisation;
  }

  getUser(id: string) {
    const user: User = {
      bannerPicture: undefined,
      certification: new Certification(),
      createdEvents: [],
      createdPosts: [],
      firstname: "firstName",
      id: "1",
      lastname: "lastname",
      likedPosts: [],
      profilePicture: undefined,
      username: "Username"
    }
    return user;
  }
}
