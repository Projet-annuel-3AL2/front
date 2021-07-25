import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CertificationRequest} from "../../shared/models/certification_request.model";

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private http: HttpClient) {
  }

  postCertification(certificationRequest: CertificationRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/certification/request`, certificationRequest);
  }
}
