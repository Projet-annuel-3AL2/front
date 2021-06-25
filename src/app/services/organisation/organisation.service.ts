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

  getOrganisationByName(orgaName: string): Observable<Organisation>{
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/${orgaName}`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getPostsOrganisation(orgaName: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/organisation/${orgaName}/posts`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  getSuggestionOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/suggestionOrganisation`, {headers: {'Access-Control-Allow-Origin': '*'}});
  }

  // TODO: A faire coté api
  putOrganisation(originalName: string, organisation:Organisation){
    this.http.put(`${environment.baseUrl}/organisation/${originalName}`, JSON.stringify(organisation),{withCredentials: true}).subscribe({
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    )
  }

  deleteOrganisation(organisationName: string){
    this.http.delete(`${environment.baseUrl}/organisation/${organisationName}`, {withCredentials: true}).subscribe({
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    )
  }

  getAllOrgaWhereUserCanCreateEvent(userId: string): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/getCreatorOrga/${userId}`);
  }

  // TODO: getOrganisationMembership A faire coté API get MemberShip JOIN User
  getOrganisationMembership(organisationName: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/getMembership/${organisationName}`)
  }

  // TODO: deleteOrganisationMembership A faire coté API
  deleteOrganisationMembership(userId: string, organisationId: string) {
    return this.http.delete(`${environment.baseUrl}/organisation/deleteMembership/${organisationId}/${userId}`).subscribe({
      error: err => {
        if (!environment.production){
          console.log(err);
        }
      }
    })
  }

  // TODO : giveAdminToMember A faire coté API, il faudrait faire un update mais je sais pas si il faut absolument l'id de membership
  giveAdminToMember(userId: string, organisationId: string) {
    this.http.put(`${environment.baseUrl}/organisation/giveAdminToMember/${organisationId}/${userId}`, null);
  }
  // TODO: pareil que pour giveAdminToMember, il faudrait faire un put
  removeAdminToAdminMember(userId: string, organisationId: string){
    this.http.put(`${environment.baseUrl}/organisation/removeAdminToAdminMember/${organisationId}/${userId}`, null);
  }
}
