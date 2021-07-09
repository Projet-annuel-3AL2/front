import {Injectable} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {Report} from "../../shared/models/report.model";
import {OrganisationRequest} from "../../shared/models/organisation_request.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) {
  }

  postOrganisation(organisation: Organisation) {
    this.http.post(`${environment.baseUrl}/organisation/`, JSON.stringify(organisation)).subscribe({
        error: err => {
          if (!environment.production) {
            console.log(err);
          }
        }
      }
    )
  }

  getAllOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/`);
  }

  getOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/${organisationId}`);
  }

  getOrganisationPosts(organisationId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/organisation/${organisationId}/posts`);
  }

  putOrganisationPost(organisationId: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.baseUrl}/organisation/${organisationId}/post`, post)
  }

  putOrganisation(organisationId: string, organisation: Organisation): Observable<Organisation> {
    return this.http.put<Organisation>(`${environment.baseUrl}/organisation/${organisationId}`, organisation);
  }

  deleteOrganisation(organisationId: string) {
    this.http.delete(`${environment.baseUrl}/organisation/${organisationId}`).subscribe({
        error: err => {
          if (!environment.production) {
            console.log(err);
          }
        }
      }
    )
  }

  // MemberOrganisation
  deleteOrganisationMembership(userId: string, organisationId: string) {
    return this.http.delete(`${environment.baseUrl}/organisation/${organisationId}/member/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/add-admin/${userId}`, {});
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/remove-admin/${userId}`, {});
  }

  getSuggestionOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/suggestions`);
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/organisation/${organisationId}/members`);
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-admin`)
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-owner`)
  }

  // TODO : get Event created par organisationId
  getEventCreated(organisationId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/organisation/${organisationId}/events`)
  }

  unfollowOrganisation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/organisation/${id}/unfollow`);
  }

  followOrganisation(id: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${id}/follow`, {});
  }

  isUserAdmin(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${organisationId}/is-user-admin/${username}`)
  }

  isUserOwner(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${organisationId}/is-user-owner/${username}`)
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/organisation/${id}/report`, report)
  }

  postOrganisationRequest(organisationRequest: OrganisationRequest): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/organisation/request-creation`, organisationRequest, {headers: {'Access-Control-Allow-Origin': '*'}})
  }
}
