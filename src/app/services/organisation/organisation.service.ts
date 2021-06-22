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










  fakeGetOrganisation(): Organisation {
    let organisation: Organisation = new Organisation();
    organisation.id = '1';
    organisation.events = this.getEvents();
    organisation.name = 'OrganisationDeBilly';
    organisation.owner = this.getUser('1');
    organisation.bannerPicture = undefined;
    organisation.members = this.getOrganisationMemberships();
    organisation.posts = this.getRelatedPost('a');

    return organisation;
  }

  getEvent(id: String) {
    const event: Event = {
      id: "1",
      name: "Nettoyage de la plage de Diepe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, " +
        "elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commodo elit ultricies vel. Sed " +
        "interdum mollis sapien, vel dictum ligula consequat in. Nulla nibh enim, sollicitudin id mattis eget, aliquet " +
        "non augue. Nunc eu malesuada erat, ac pulvinar odio. Quisque tempor venenatis vestibulum. Aenean magna lectus, " +
        "vestibulum bibendum nunc id, blandit hendrerit nulla. Vivamus suscipit elementum arcu, nec vestibulum mauris euismod " +
        "vel. Curabitur interdum, mi fermentum mattis lobortis, turpis est bibendum augue, at mattis lorem libero et lacus." +
        " Sed consectetur condimentum turpis, in fermentum lacus porta nec. Ut luctus tincidunt mollis. ",
      category: new Category('1','Nettoyage de plage'),
      creator: new User(),
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1),
      latitude: 49.929118,
      longitude: 1.076918,
      organisation: this.getFakeOrgaMini(),
      participantsLimit: 15,
      picture: undefined,
      participants: this.getParticipants('1')

    }
    return event;
  }

  getEvents(): Event[] {
    return [
      this.getEvent("1"),
      this.getEvent("2"),
      this.getEvent("3"),
      this.getEvent("4")
    ];
  }

  getEventFilter() {
    let events = [
      this.getEvent("3"),
      this.getEvent("4")
    ]
    return events;
  }

  getParticipants(id: string) {
    let users: User[];
    users = [
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id),
      this.getUser(id)
    ]
    return users;
  }

  getUser(id: string) {
    const user: User = {
      bannerPicture: undefined,
      certification: undefined,
      createdEvents: [],
      createdPosts: [],
      firstname: "firstName",
      id: "1",
      lastname: "lastname",
      likedPosts: [],
      profilePicture: undefined,
      username: "username"
    }
    return user;
  }

  private getOrganisationMemberships(): OrganisationMembership[] {

    return [
      this.getOrganisationMembershipAdmin(),
      this.getOrganisationMembershipAdmin(),
      this.getOrganisationMembershipAdmin(),
      this.getOrganisationMembershipAdmin(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
      this.getOrganisationMembership(),
    ];
  }

  getOrganisationMembership(): OrganisationMembership {
    let orgaMember: OrganisationMembership = new OrganisationMembership(this.getUser('1'));
    orgaMember.organisation = undefined;
    orgaMember.isAdmin = false;
    return orgaMember;
  }

  getOrganisationMembershipAdmin(): OrganisationMembership {
    let orgaMember: OrganisationMembership  = new OrganisationMembership(this.getUser('1'));
    orgaMember.organisation = undefined;
    orgaMember.isAdmin = true;
    return orgaMember;
  }

  getRelatedPost(id: string) {
    let posts: Post[];

    posts = [
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id),
      this.getPost(id)
    ]
    return posts;
  }

  private getPost(id: string) {
    const post: Post = {
      commentCount: 10,
      comments: [],
      createdAt: undefined,
      creator: new User(),
      event: new Event(),
      group: undefined,
      id: "1",
      likeCount: 100,
      likes: [],
      medias: [],
      organisation: this.getFakeOrgaMini(),
      postShares: undefined,
      shareCount: 8,
      sharedPost: undefined,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commod"
    }
    return post;
  }

  getListOrganisation() {
    return [
      this.fakeGetOrganisation(),
      this.fakeGetOrganisation(),
      this.fakeGetOrganisation()
    ];
  }

  private getFakeOrgaMini() {
    let organisation: Organisation = new Organisation();
    organisation.id = '1';
    organisation.name = 'OrganisationDeBilly';
    organisation.owner = this.getUser('1');
    organisation.bannerPicture = undefined;

    return organisation;
  }
}
