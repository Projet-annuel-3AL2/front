import { Injectable } from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {User} from "../../shared/models/user.model";
import {Organisation} from "../../shared/models/organisation.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

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
      latitude: 0,
      longitude: 0,
      organisation: new Organisation('1', 'OrganisationName'),
      participantsLimit: 0,
      picture: undefined

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
}
