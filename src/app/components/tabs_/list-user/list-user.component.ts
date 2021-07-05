import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @Input('listUser') listUser$: User[] = [];
  @Input('userSession') userSession: User;

  constructor() { }

  ngOnInit(): void {
  }

}
