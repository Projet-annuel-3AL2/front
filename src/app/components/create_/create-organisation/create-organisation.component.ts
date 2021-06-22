import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.css']
})
export class CreateOrganisationComponent implements OnInit {

  showPopup: boolean = false;
  user: User;

  constructor(private userService: UserService,
              // private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.user = this.userService.getUser('fakeData')

    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
  }


  openPopup() {
    this.showPopup = true;
    document.querySelector("body").classList.add("no-scroll");
  }

  closePopup() {
    this.showPopup = false;
    document.querySelector("body").classList.remove("no-scroll");
  }
}
