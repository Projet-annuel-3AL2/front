import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {Group} from "../../shared/models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  create(name: string, users: User[]): Observable<Group>{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("users", JSON.stringify(users.map(user=>user.id)));
    console.log(JSON.stringify(formData))
    return this.http.post<Group>(`${environment.apiBaseUrl}/group`, formData);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/group/${id}/report`, report);
  }

  leave(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/group/${id}/leave`);
  }
}
