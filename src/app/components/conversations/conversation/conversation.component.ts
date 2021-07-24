import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../shared/models/conversation.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {User} from "../../../shared/models/user.model";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scroll', {static: false}) scrollFrame: ElementRef;
  @Input()
  conversation: Conversation;
  message: string;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  user: User;
  private isNearBottom = true;
  private scroll: any;
  private timeSubscription: Subscription;

  constructor(private authService: AuthService, public conversationBoxService: ConversationBoxService, private conversationService: ConversationService) {
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.conversation = this.conversationBoxService.selectedConversation;
    this.conversationService.getMessages(this.conversation.id)
      .toPromise().then(messages => {
      this.conversation.messages = messages;
    });
  }

  ngAfterViewInit() {
    this.scroll = this.scrollFrame.nativeElement;
    this.timeSubscription = timer(0, 3000)
      .subscribe(() => this.updateConversation());
  }

  updateConversation() {
    this.conversationService.getMessages(this.conversation.id)
      .toPromise().then(messages => {
      this.conversation.messages = messages;
      this.isNearBottom = this.isUserNearBottom();
      if (this.isNearBottom) {
        this.scroll.scroll({
          top: this.scroll.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  getConversationName(): string {
    if (this.conversation.group) {
      return this.conversation.group.name;
    } else if (this.conversation.organisation) {
      return this.conversation.organisation.name;
    } else if (this.conversation.friendship) {
      return this.conversation.friendship.friendOne.username !== this.authService.getCurrentUsername() ? this.conversation.friendship.friendOne.username : this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }

  leaveConversation() {
    this.conversationBoxService.unselectConversation();
  }

  sendMessage() {
    let message: Message = new Message();
    message.text = this.message;
    this.conversationService.sendMessage(this.conversation.id, message)
      .toPromise()
      .then(() => this.updateConversation());
    this.message = "";
  }

  private isUserNearBottom(): boolean {
    const threshold = 5;
    const position = this.scroll.scrollTop + this.scroll.offsetHeight;
    const height = this.scroll.scrollHeight;
    return position > height - threshold;
  }
}
