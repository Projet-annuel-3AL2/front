import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {EventService} from "../event/event.service";
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Organisation} from "../../shared/models/organisation.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {Certification} from "../../shared/models/certification.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
            private authService: AuthService) { }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.baseUrl}/user/${this.authService.getCurrentUserId()}/conversations`);
  }


  getById(userId: string) {
    return this.http.get<User>(`${environment.baseUrl}/user/${userId}`);
  }

  fakeGetParticipants(id: string) {
    let users: User[];
    users = [
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id),
      this.fakeGetUser(id)
    ]
    return users;
  }

   fakeGetUser(id: string) {
    const user: User = {
      bannerPicture: undefined,
      certification: new Certification(),
      createdEvents: [],
      createdPosts: [],
      firstname: "firstName",
      id: "1",
      lastname: "lastname",
      likedPosts: [],
      profilePicture: undefined,
      username: "Username"
    }
    return user;
  }

  getUserRelatedUser(user: User) {
    return this.fakeGetParticipants('1');
  }

  getUserRelatedEvent(user: User): Event[] {
    return this.getEvents();
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
      organisation: this.fakeGetOrganisation(),
      participantsLimit: 15,
      picture: undefined,
      participants: []

    }
    return event;
  }

  getEvents() {
    let events = [
      this.getEvent("1"),
      this.getEvent("2"),
      this.getEvent("3"),
      this.getEvent("4")
    ]
    return events;
  }

  fakeGetOrganisation(): Organisation {
    let organisation: Organisation = new Organisation();
    organisation.id = '1';
    organisation.name = 'OrganisationDeBilly';
    organisation.owner = this.fakeGetUser('1');
    organisation.bannerPicture = undefined;


    return organisation;
  }
}

