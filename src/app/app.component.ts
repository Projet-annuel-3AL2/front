import {Component} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {User} from "./shared/models/user.model";
import {UserService} from "./services/user/user.service";
import {environment} from "../environments/environment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  user: User;

  constructor(public authService: AuthService,
              private userService: UserService,
              private _titleService: Title) {
    this._titleService.setTitle(environment.name);
  }
}
