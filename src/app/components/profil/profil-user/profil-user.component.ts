import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {Event} from '../../../shared/models/event.model';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  user: User;
  listPost$: Post[];
  listEvent$: Event[];
  listUser$: User[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username']
    this.getUser(username);
    this.getRelatedPost(username);
    this.getRelatedEvent(this.user);
    this.getUserFriends(this.user);
  }

  private getUser(username: string) {
    this.user = this.userService.getUser('1');
  }

  askFriend(id: string) {

  }

  isNotAlreadyFriend() {
    return true;
  }

  private getRelatedPost(username: any) {
    this.postService.getPostByUsername(username).subscribe({
      next: posts => {
        this.listPost$ = posts
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getRelatedEvent(user: User) {
    this.listEvent$ = this.userService.getUserRelatedEvent(user)
  }

  private getUserFriends(user: User) {
    this.listUser$ = this.userService.getUserRelatedUser(user)    ;
  }
}
