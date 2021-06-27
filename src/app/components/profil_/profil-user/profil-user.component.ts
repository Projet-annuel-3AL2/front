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
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  user$: User;
  userSession: User;
  listPost$: Post[];
  listEvent$: Event[];
  listUser$: User[];
  isCanAdd: boolean = true;

  constructor(private _userService: UserService,
              private route: ActivatedRoute,
              private _postService: PostService,
              private _friendshipService: FriendshipService,
              private _eventService: EventService,
              private _authService: AuthService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];

    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.userSession=user;

    });
    // TODO: fonction pas activé
    this.getFullUser(username);
    // this.getRelatedPost(username);
    // this.getRelatedEvent(this.user.id);
    // this.getUserFriends(this.user.id);
    this.canAdd();
  }

  private getFullUser(username: string) {
    this._userService.getFullUser(username).subscribe({
      next: user => {
        this.user$ = user
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    })
  }

  private getRelatedPost(username: any) {
    this._postService.getPostWithUsername(username).subscribe({
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

  private getRelatedEvent(userId: string) {
    this._eventService.getEventRelatedToUser(userId).subscribe({
      next: events => {
        this.listEvent$ = events
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  private getUserFriends(userId: string) {
    this._userService.getUserFriends(userId).subscribe({
      next: users => {
        this.listUser$ = users
      },
      error: error => {
        if (!environment.production) {
          console.error('Error: ', error);
        }
      }
    });
  }

  // TODO : Logique de Un user peut ajouter ou non un amis (voir list d'amis)
  canAdd() {
    this.isCanAdd = true;
  }
  dellFriend(username: string) {
    // this._friendshipService.removeFriendship(username);
  }

  askFriend(username: string) {
    // this._friendshipService.postFriendship(username);
  }
}
