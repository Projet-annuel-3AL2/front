import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../../shared/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {Event} from '../../../shared/models/event.model';
import {environment} from "../../../../environments/environment";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {EventService} from "../../../services/event/event.service";

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
              private postService: PostService,
              private friendshipService: FriendshipService,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser('a');
    this.listPost$ = this.postService.getRelatedPost('a');
    this.listEvent$ = this.eventService.getEvents();
    this.listUser$ = this.userService.getParticipants('a');
    // const username = this.route.snapshot.params['username']
    // this.getUser(username);
    // this.getRelatedPost(username);
    // this.getRelatedEvent(this.user);
    // this.getUserFriends(this.user);
  }

  private getUser(username: string) {
    this.user = this.userService.getUser('1');
  }

  askFriend(username: string) {
    this.friendshipService.postFriendship(username);
  }

  // TODO : isNotAlreadyFriend() A faire (trouver comment récupérer les amis)
  faEllipsisH = faEllipsisH;
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
    this.listUser$ = this.userService.getUserRelatedUser(user);
  }
}
