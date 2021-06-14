import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {Post} from "../../shared/models/post.model";
import {PostService} from "../../services/post/post.service";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  user: User;
  listPost: Post[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username']
    this.getUser(username);
    this.getRelatedPost(username);
  }

  private getUser(username: string) {
    this.user = this.userService.getUser(username)
  }

  askFriend(id: string) {

  }

  isNotAlreadyFriend() {
    return false;
  }

  private getRelatedPost(username: any) {
    this.listPost = this.postService.getUserRelatedPost(username);
  }
}
