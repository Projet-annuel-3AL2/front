import {Injectable} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {Report} from "../../shared/models/report.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) {
  }

  postOrganisation(organisation: Organisation) {
    this.http.post(`${environment.apiBaseUrl}/organisation/`, JSON.stringify(organisation)).subscribe({
        error: err => {
          if (!environment.production) {
            console.log(err);
          }
        }
      }
    )
  }

  getAllOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/`);
  }

  getOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/organisation/${organisationId}`);
  }

  getOrganisationPosts(organisationId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/posts`);
  }

  putOrganisationPost(organisationId: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.apiBaseUrl}/organisation/${organisationId}/post`, post)
  }

  putOrganisation(organisationId: string, organisation: Organisation): Observable<Organisation> {
    return this.http.put<Organisation>(`${environment.apiBaseUrl}/organisation/${organisationId}`, organisation);
  }

  deleteOrganisation(organisationId: string) {
    this.http.delete(`${environment.apiBaseUrl}/organisation/${organisationId}`).subscribe({
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
    return this.http.delete(`${environment.apiBaseUrl}/organisation/${organisationId}/member/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/add-admin/${userId}`, {});
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/remove-admin/${userId}`, {});
  }

  getSuggestionOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/suggestions`);
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/members`);
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-admin`)
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-owner`)
  }

  // TODO : get Event created par organisationId
  getEventCreated(organisationId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/events`)
  }

  unfollowOrganisation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}/unfollow`);
  }

  followOrganisation(id: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${id}/follow`, {});
  }

  isUserAdmin(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${organisationId}/is-user-admin/${username}`)
  }

  isUserOwner(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${organisationId}/is-user-owner/${username}`)
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/organisation/${id}/report`, report)
  }
}
