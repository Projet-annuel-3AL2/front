import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-profil-list-event',
  templateUrl: './profil-list-event.component.html',
  styleUrls: ['./profil-list-event.component.css']
})
export class ProfilListEventComponent implements OnInit {


  @Input('listEvent') listEvent$: Event[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
