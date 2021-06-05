import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appConversationBox]'
})
export class ConversationBoxDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
