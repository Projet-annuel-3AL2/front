import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../../shared/models/media.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  public getPostMedias(postId: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${environment.baseUrl}/media/post/${postId}`);
  }
}
