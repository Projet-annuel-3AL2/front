import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {User} from "../../shared/models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {

  @Input('event') event : Event = new Event();

  users$: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getParticipants()
  }

  private getParticipants() {
    this.users$ = this.userService.getParticipants(this.event.id);
  }
}
