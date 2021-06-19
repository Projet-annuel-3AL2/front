import { Component, OnInit } from '@angular/core';
import {faTimes, faImage, faSmile, faCalendarAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-create-post-button',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  showPopup:boolean = false;
  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  user: User;
  text: string;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
      this.user=user;
    });
  }

  addEmoji($event: any) {
    this.text += $event.emoji.native;
  }

  openPopup() {
    this.text = "";
    this.showPopup = true;
  }

  closePopup() {
    this.text = "";
    this.showPopup = false;
  }
}
