import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../shared/models/message.model";
import {AuthService} from "../../../services/auth/auth.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;
  env: any;

  constructor(public authService: AuthService) {
    this.env = environment;
  }

  ngOnInit(): void {
  }

}
