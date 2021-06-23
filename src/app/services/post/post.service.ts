import { Injectable } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    return this.http.post<Post>(`${environment.baseUrl}/post`, post);
  }
}
