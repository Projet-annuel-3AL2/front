import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/models/category.model";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/`);
  }

  getEventByCategory(categoryId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/category/${categoryId}/events`);
  }
}
