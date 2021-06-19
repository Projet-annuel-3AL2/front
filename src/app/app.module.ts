import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PostComponent} from './components/post/post.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './components/navbar/navbar.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {MaterialModule} from "./material.module";
import {AppRoutingModule} from "./app-routing.module";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {EventSuggestionComponent} from "./components/event-suggestion/event-suggestion.component";
import {EventSuggestionListComponent} from "./components/event-suggestion-list/event-suggestion-list.component";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/register/register.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConversationComponent} from "./components/conversations/conversation/conversation.component";
import {ConversationsBoxComponent} from "./components/conversations/conversations-box/conversations-box.component";
import {MessageComponent} from "./components/conversations/message/message.component";
import {ConversationCardComponent} from "./components/conversations/conversation-card/conversation-card.component";
import {TimeagoModule} from "ngx-timeago";
import {ConversationBoxDirective} from "./directives/conversation-box/conversation-box.directive";
import {ConversationBoxService} from "./services/conversation-box/conversation-box.service";
import {ConversationsListComponent} from "./components/conversations/conversations-list/conversations-list.component";
import {GlobalHttpInterceptor} from "./shared/interceptors/global-http-interceptor.service";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {PickerModule} from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    NavbarComponent,
    MessageComponent,
    TimelineComponent,
    RegisterComponent,
    CreatePostComponent,
    ConversationComponent,
    EventSuggestionComponent,
    ConversationBoxDirective,
    ConversationsBoxComponent,
    ConversationCardComponent,
    ConversationsListComponent,
    EventSuggestionListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot(),
    FormsModule,
    PickerModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, MaterialModule],
  providers: [AuthGuardService, NegateAuthGuardService, ConversationBoxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
