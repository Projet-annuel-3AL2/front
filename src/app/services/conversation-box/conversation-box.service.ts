import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {Conversation} from "../../shared/models/conversation.model";
import {ConversationComponent} from "../../components/conversations/conversation/conversation.component";
import {BehaviorSubject} from "rxjs";
import {ConversationsListComponent} from "../../components/conversations/conversations-list/conversations-list.component";

@Injectable({
  providedIn: 'root'
})
export class ConversationBoxService {
  private isConversationSelected= new BehaviorSubject(false);
  isConversationSelected$ = this.isConversationSelected.asObservable();
  selectedConversation: Conversation;
  opened: boolean = false;

  constructor(private cfr: ComponentFactoryResolver) {}

  async loadComponent(vcr: ViewContainerRef, isConversationSelected: boolean) {
    vcr.clear();
    const { ConversationComponent } = await import('../../components/conversations/conversation/conversation.component');

    const { ConversationsListComponent } = await import('../../components/conversations/conversations-list/conversations-list.component');
    console.log(isConversationSelected)
    let component : any = isConversationSelected ? ConversationComponent : ConversationsListComponent;
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(component))
  }

  selectConversation(conversation: Conversation){
    this.selectedConversation = conversation;
    this.isConversationSelected.next(true);
  }

  unselectConversation(){
    this.selectedConversation = undefined;
    this.isConversationSelected.next(false);
  }
}
