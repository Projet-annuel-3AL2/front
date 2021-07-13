import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/models/category.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/`);
  }

  getCategoryById(categoryId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/${categoryId}`);
  }

  getEventByCategory(categoryId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/category/${categoryId}/events`);
  }
}
