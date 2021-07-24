import {Component, OnDestroy, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupDialogComponent} from "../../dialog_/create-group-dialog/create-group-dialog.component";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent implements OnInit, OnDestroy {
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faPlusCircle = faPlusCircle;
  conversations: Conversation[];
  timerSubscription: Subscription;
  constructor(public conversationBoxService: ConversationBoxService, private userService: UserService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.timerSubscription=timer(0,20000)
      .subscribe(()=>this.userService.getConversations()
        .toPromise()
        .then(conversations => this.conversations = conversations));
  }

  openCreateGroupDialog() {
    this.matDialog.open(CreateGroupDialogComponent);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
