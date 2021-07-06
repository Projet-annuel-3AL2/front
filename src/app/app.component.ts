import {Component} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {User} from "./shared/models/user.model";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  user: User;

  constructor(public authService: AuthService,
              private userService: UserService) {
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
  }

  // TODO: Je sais pas si on à la certif avec getById()
  canCreateEvent() {
    if (this.user != undefined) {
      return this.user.certification !== undefined;
    }
    return false;
  }

  // TODO : Je sais pas si un user peut avoir ou pas plusieurs organisation
  canCreateOrganisation() {
    if (this.user != undefined) {
      return this.user.certification !== undefined;
    }
    return false;
  }
}
