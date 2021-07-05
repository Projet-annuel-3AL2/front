import {Injectable} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) { }

  postOrganisation(organisation:Organisation){
    this.http.post(`${environment.baseUrl}/organisation/`, JSON.stringify(organisation), {headers: {'Access-Control-Allow-Origin': '*'}}).subscribe({
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    )
  }

  getAllOrganisation(): Observable<Organisation[]>{
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/${organisationId}`,{headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getOrganisationPosts(organisationId: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/organisation/${organisationId}/posts`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  putOrganisationPost(organisationId: string, post: Post): Observable<Post>{
    return this.http.put<Post>(`${environment.baseUrl}/organisation/${organisationId}/post`, post, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  putOrganisation(organisationId: string, organisation:Organisation){
    this.http.put(`${environment.baseUrl}/organisation/${organisationId}`, JSON.stringify(organisation),{headers: {'Access-Control-Allow-Origin': '*'}}).subscribe({
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    )
  }

  deleteOrganisation(organisationId: string){
    this.http.delete(`${environment.baseUrl}/organisation/${organisationId}`, {headers: {'Access-Control-Allow-Origin': '*'}} ).subscribe({
        error: err => {
          if (!environment.production){
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

  getAllOrgaWhereUserCanCreateEvent(userId: string): Observable<Organisation[]> {
    return ;
    //this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/getCreatorOrga/${userId}`);
  }

  giveAdminToMember(userId: string, organisationId: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/add-admin/${userId}`, null);
  }

  removeAdminToAdminMember(userId: string, organisationId: string): Observable<void>{
    return this.http.put<void>(`${environment.baseUrl}/organisation/${organisationId}/remove-admin/${userId}`, null);
  }

  getSuggestionOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/suggestions`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/organisation/${organisationId}/members`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  isAdmin(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-admin`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  isOwner(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${id}/is-owner`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  // TODO : get Event created par organisationId
  getEventCreated(organisationId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.baseUrl}/organisation/${organisationId}/events`, {headers: {'Access-Control-Allow-Origin': '*'}})
  }

  unfollowOrganisation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/organisation/${id}/unfollow`);
  }

  followOrganisation(id: string): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/organisation/${id}/follow`, null);
  }

  isUserAdmin(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${organisationId}/is-user-admin/${username}`)
  }

  isUserOwner(organisationId: string, username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/organisation/${organisationId}/is-user-owner/${username}`)
  }
}
