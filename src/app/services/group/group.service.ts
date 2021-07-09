import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/group/${id}/report`, report)
  }
}
