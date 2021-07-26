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
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) {
  }

  getSuggestions(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/`);
  }

  getOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/organisation/${organisationId}`);
  }

  getOrganisationPosts(organisationId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/posts`);
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/members`);
  }

  getEventCreated(organisationId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/events`);
  }

  whereIsAdmin(username: string): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/membership/where-admin/${username}`);
  }

  putOrganisation(id: string, form: FormGroup, updatedProfilePicture: File, updatedBannerPicture: File): Observable<Organisation> {
    const formData = new FormData()
    if (form.value.name != null){
      formData.append("name", form.value.name)
    }
    if (updatedProfilePicture !== null) {
      formData.append("profilePicture", updatedProfilePicture)
    }
    if (updatedBannerPicture !== null) {

      formData.append("bannerPicture", updatedBannerPicture)
    }
    return this.http.put<Organisation>(`${environment.apiBaseUrl}/organisation/${id}`, formData);
  }

  deleteOrganisationMembership(userId: string, organisationId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/organisation/${organisationId}/member/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/add-admin/${userId}`, {});
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/remove-admin/${userId}`, {});
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-admin`)
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/organisation/${id}/is-owner`)
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

  postOrganisationRequest(organisationRequest: OrganisationRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/organisation/request-creation`, organisationRequest)
  }

  postInvitation(organisationId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/invite/${userId}`, null)
  }

  cancelInvitation(organisationId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/cancel/${userId}`)
  }

  rejectInvitation(organisationId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/invite/reject`)
  }

  acceptInvitation(organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/organisation/${organisationId}/invite/accept`, null)
  }

  getInvitedOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/invited/user`);
  }

  leave(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/organisation/${id}/leave`);
  }
}
