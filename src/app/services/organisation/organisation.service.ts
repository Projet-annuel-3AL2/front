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
    this.http.post(`${environment.baseUrl}/organisation/`, JSON.stringify(organisation), {withCredentials: true}).subscribe({
        error: err => {
          if (!environment.production){
            console.log(err);
          }
        }
      }
    )
  }

  getAllOrganisation(): Observable<Organisation[]>{
    return this.http.get<Organisation[]>(`${environment.baseUrl}/organisation/`);
  }

  getOrganisationByName(orgaName: string): Observable<Organisation>{
    return this.http.get<Organisation>(`${environment.baseUrl}/organisation/${orgaName}`);
  }

  getPostsOrganisation(orgaName: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.baseUrl}/organisation/${orgaName}/posts`);
  }

  getSuggestionOrganisation(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.baseUrl}/suggestion-organisation`);
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

  // TODO: getOrganisationMembership A faire coter API get MemberShip JOIN User
  getOrganisationMembership(organisationName: string): Observable<OrganisationMembership[]> {
    return this.http.get<OrganisationMembership[]>(`${environment.baseUrl}/organisation/getMembership/${organisationName}`)
  }
}
