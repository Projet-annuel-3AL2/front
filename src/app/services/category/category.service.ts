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

  public categories: Observable<Category[]>;

  private categoriesSubject: BehaviorSubject<Category[]>

  constructor(private http: HttpClient) {
    this.categoriesSubject = new BehaviorSubject<Category[]>(null);

    this.categories = this.categoriesSubject.asObservable();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/category/`)
      .pipe(map(categories => {
        this.categoriesSubject.next(categories);
        return categories;
      }));
  }

  getEventByCategory(categoryId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/category/${categoryId}/events`);
  }
}
