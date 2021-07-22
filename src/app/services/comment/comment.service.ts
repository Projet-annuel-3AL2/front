import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  deleteComment(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/comment/${id}`);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/comment/${id}/report`, report);
  }
}
