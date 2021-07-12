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
  private postsSubject: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
    this.posts = this.postsSubject.asObservable();
  }

  createPost(text: string, sharesPost: Post, files: File[]) {
    const formData = new FormData();
    formData.append("text", text);
    if (sharesPost !== undefined && sharesPost !== null) {
      formData.append("sharesPost", JSON.stringify(sharesPost));
    }
    if(files){
      for (let file of files) {
        formData.append("post_medias", file);
      }
    }
    return this.http.post<Post>(`${environment.baseUrl}/post`, formData).pipe(map(post => {
      this.postsSubject.next([post].concat(this.postsSubject.getValue()));
      return post;
    }));
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/post/${postId}`);
  }

  getTimeline(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/timeline/0/0`)
      .pipe(map(posts => {
        this.postsSubject.next(posts);
        return posts;
      }));
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

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/post/${id}/report`, report);
  }

  dislikePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/post/${postId}/like`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseUrl}/post/${postId}/comments`);
  }

  sendComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.baseUrl}/post/${postId}/comment`, {text});
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/post/${postId}`).pipe(map(() => {
      this.postsSubject.next(this.postsSubject.getValue().filter(a => a.id !== postId));
    }));
  }

  sharedPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/post/${postId}/shares`);
  }
}
