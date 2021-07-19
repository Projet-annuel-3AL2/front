import {Injectable} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {User} from "../../shared/models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Report} from "../../shared/models/report.model";
import {Comment} from "../../shared/models/comment.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Observable<Post[]>;
  public post: Observable<Post>;
  private postsSubject: BehaviorSubject<Post[]>;
  private postSubject: BehaviorSubject<Post>;

  constructor(private http: HttpClient) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
    this.posts = this.postsSubject.asObservable();
    this.postSubject = new BehaviorSubject<Post>(null);
    this.post = this.postSubject.asObservable();
  }

  createPost(text: string, sharesPost: string, sharedEvent: string, files: File[]) {
    const formData = new FormData();
    if (text === undefined) {
      text = "";
    }
    formData.append("text", text);
    if (sharesPost !== undefined && sharesPost !== null) {
      formData.append("sharesPost", sharesPost);
    }
    if (sharedEvent !== undefined && sharedEvent !== null) {
      formData.append("sharedEvent", sharedEvent);
    }
    if (files) {
      for (let file of files) {
        formData.append("post_medias", file);
      }
    }
    return this.http.post<Post>(`${environment.apiBaseUrl}/post`, formData).pipe(map(post => {
      this.postsSubject.next([post].concat(this.postsSubject.getValue()));
      return post;
    }));
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}`).pipe(map(post => {
      this.postSubject.next(post);
      return post;
    }));
  }

  getTimeline(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/timeline/0/0`)
      .pipe(map(posts => {
        this.postsSubject.next(posts);
        return posts;
      }));
  }

  getPostLikes(postId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/post/${postId}/likes`);
  }

  isPostLiked(postId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/post/${postId}/is-liked`);
  }

  likePost(postId: string): Observable<void> {
    return this.http.get<void>(`${environment.apiBaseUrl}/post/${postId}/like`);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/post/${id}/report`, report);
  }

  dislikePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}/like`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/post/${postId}/comments`).pipe(map(comments => {
      let post = this.postSubject.getValue();
      post.comments = comments;
      return comments;
    }));
  }

  sendComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/post/${postId}/comment`, {text}).pipe(map(comment => {
      let post = this.postSubject.getValue();
      if (post.comments === undefined) {
        post.comments = [];
      }
      post.comments = [comment].concat(post.comments);
      this.postSubject.next(post);
      return comment;
    }));
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}`).pipe(map(() => {
      this.postsSubject.next(this.postsSubject.getValue().filter(a => a.id !== postId));
    }));
  }

  sharedPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}/shares`);
  }
}
