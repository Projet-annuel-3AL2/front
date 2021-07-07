import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {SearchResult} from "../../shared/models/search.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchData(data: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${environment.baseUrl}/search/${data}`);
  }
}
