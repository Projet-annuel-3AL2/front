import {Injectable} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {User} from "../../shared/models/user.model";
import {OrganisationMembership} from "../../shared/models/organisation_membership.model";
import {Post} from "../../shared/models/post.model";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor() { }

  getOrganisation(): Organisation {
    let organisation: Organisation = new Organisation('a', 'b', undefined);
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
      organisation: new Organisation('1', 'OrganisationName', [
        new OrganisationMembership(this.getUser("1")),
        new OrganisationMembership(this.getUser("1")),
        new OrganisationMembership(this.getUser("1")),
        new OrganisationMembership(this.getUser("1"))
      ]),
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
      organisation: new Organisation('1', 'organisationName', []),
      postShares: undefined,
      shareCount: 8,
      sharedPost: undefined,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat felis porta nulla auctor, elementum pellentesque sapien aliquam. Maecenas pulvinar dictum mauris, vel commod"
    }
    return post;
  }
}
