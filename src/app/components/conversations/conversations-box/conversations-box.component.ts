import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {ConversationBoxDirective} from "../../../directives/conversation-box/conversation-box.directive";
import {mergeMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-conversations-box',
  templateUrl: './conversations-box.component.html',
  styleUrls: ['./conversations-box.component.css'],
  animations:[
    trigger('openClose', [
      state('open',style({
        transform: 'translateY(00%)'
      })),
      state('closed',style({
        transform: 'translateY(0%)'
      })),
      transition('closed => open', [
        animate('300ms ease-out', style({transform: 'translateY(0%)'}))
      ]),
      transition('open => closed', [
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
})
export class ConversationsBoxComponent implements OnInit, OnDestroy {
  @ViewChild(ConversationBoxDirective, { static: true })
  conversationBoxDirective: ConversationBoxDirective;
  opened: boolean;
  conversations: Conversation[];
  private destroySubject = new Subject();

  constructor(public conversationBoxService: ConversationBoxService) { }

  ngOnInit(): void {
    const viewContainerRef = this.conversationBoxDirective.viewContainerRef;
    this.conversationBoxService.isConversationSelected$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isConversationSelected => this.conversationBoxService.loadComponent(viewContainerRef, isConversationSelected)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
