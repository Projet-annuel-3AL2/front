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
