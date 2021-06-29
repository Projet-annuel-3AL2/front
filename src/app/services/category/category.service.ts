import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/models/category.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.baseUrl}/category/`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getCategoryById(categoryId: string): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.baseUrl}/category/${categoryId}`);
  }

  getEventByCategory(categoryId: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.baseUrl}/category/${categoryId}/events`);
  }


  // TODO : Les fonctions seront là seront pas plutôt coter admin ?
  deleteCategory(categoryId: string){
    this.http.delete(`${environment.baseUrl}/category/${categoryId}`, {withCredentials: true}).subscribe({
      error: error => {
        if (!environment.production){
          console.error('There was an error!', error);
        }
      }
    })
  }


  postCategory(category: Category){
    this.http.post<Category>(`${environment.baseUrl}/category/`, JSON.stringify(category), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  putCategory(categoryName: string, category: Category){
    this.http.put<Category>(`${environment.baseUrl}/category/${categoryName}`, JSON.stringify(category), {withCredentials: true}).subscribe({
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}