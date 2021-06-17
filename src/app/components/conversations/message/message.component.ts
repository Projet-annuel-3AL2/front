import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../shared/models/message.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
