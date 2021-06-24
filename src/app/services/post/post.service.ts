import { Injectable } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    return this.http.post<Post>(`${environment.baseUrl}/post`, post);
  }

  getTimeline(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/post/timeline/0/0`);
  }
}
