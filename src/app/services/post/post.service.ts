import {Injectable} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {User} from "../../shared/models/user.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Report} from "../../shared/models/report.model";
import {Comment} from "../../shared/models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
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
    return this.http.post<Post>(`${environment.apiBaseUrl}/post`, formData);
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  getTimeline(limit: number, offset: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/timeline/${offset}/${limit}`);
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
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/post/${postId}/comments`);
  }

  sendComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/post/${postId}/comment`, {text});
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  sharedPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}/shares`);
  }
}
