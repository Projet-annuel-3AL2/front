import {Injectable} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {Post} from "../../shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {Event} from "../../shared/models/event.model";
import {Report} from "../../shared/models/report.model";
import {OrganisationRequest} from "../../shared/models/organisation_request.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  public organisation: Observable<Organisation>;
  public organisationsSuggestion: Observable<Organisation[]>;
  public members: Observable<User[]>;
  public eventsCreated: Observable<Event[]>;
  public posts: Observable<Post[]>;

  private organisationSubject: BehaviorSubject<Organisation>;
  private organisationSuggestionSubject: BehaviorSubject<Organisation[]>;
  private membersSubject: BehaviorSubject<User[]>;
  private eventsCreatedSubject: BehaviorSubject<Event[]>
  private postsSubject: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {
    this.membersSubject = new BehaviorSubject<User[]>(null);
    this.organisationSubject = new BehaviorSubject<Organisation>(null);
    this.organisationSuggestionSubject = new BehaviorSubject<Organisation[]>(null);
    this.eventsCreatedSubject = new BehaviorSubject<Event[]>(null);
    this.postsSubject = new BehaviorSubject<Post[]>(null);

    this.members = this.membersSubject.asObservable();
    this.organisation = this.organisationSubject.asObservable();
    this.organisationsSuggestion = this.organisationSuggestionSubject.asObservable();
    this.eventsCreated = this.eventsCreatedSubject.asObservable();
    this.posts = this.postsSubject.asObservable();
  }

  getSuggestions(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(`${environment.apiBaseUrl}/organisation/`)
      .pipe(map(organisations => {
        this.organisationSuggestionSubject.next(organisations);
        return organisations;
      }));
  }

  getOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${environment.apiBaseUrl}/organisation/${organisationId}`)
      .pipe(map(organisation => {
        this.organisationSubject.next(organisation);
        return organisation;
      }));
  }

  getOrganisationPosts(organisationId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/posts`)
      .pipe(map(posts => {
        this.postsSubject.next(posts);
        return posts;
      }));
  }

  getMemberOrganisation(organisationId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/members`)
      .pipe(map(users => {
        this.membersSubject.next(users);
        return users;
      }));
  }

  getEventCreated(organisationId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/organisation/${organisationId}/events`)
      .pipe(map(events => {
        this.eventsCreatedSubject.next(events);
        return events;
      }));
  }

  putOrganisation(organisation: Organisation, updatedProfilePicture: File, updatedBannerPicture: File): Observable<Organisation> {

    console.log(updatedBannerPicture)
    if (updatedProfilePicture !== null) {
      const formData = new FormData()
      formData.append("profilePicture", updatedProfilePicture)
      console.log(formData)
      this.http.put(`${environment.apiBaseUrl}/organisation/${organisation.id}/profile-picture`, formData).subscribe({
        next: () => {
          console.log("ça passer pour profile")
        },
        error: err => {
          console.log(err)
        }
      });
    }
    if (updatedBannerPicture !== null) {
      const formData = new FormData()
      formData.append("bannerPicture", updatedBannerPicture)
      this.http.put(`${environment.apiBaseUrl}/organisation/${organisation.id}/banner-picture`, formData).subscribe({
        next: () => {
          console.log("ça passe pour banner")
        },
        error: err => {
          console.log(err)
        }
      });
    }
    return this.http.put<Organisation>(`${environment.apiBaseUrl}/organisation/${organisation.id}`, organisation);
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
    return this.http.post<void>(`${environment.apiBaseUrl}/organisation/request-creation`, organisationRequest, {headers: {'Access-Control-Allow-Origin': '*'}})
  }
}
