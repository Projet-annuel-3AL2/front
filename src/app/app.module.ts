import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {PostComponent} from './components/card_/post/post.component';
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
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {EventSuggestionComponent} from "./components/card_/event-suggestion/event-suggestion.component";
import {ListEventSuggestionComponent} from "./components/tabs_/list-event-suggestion/list-event-suggestion.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {EventInfosComponent} from "./components/tabs_/event-infos/event-infos.component";
import {UserCardComponent} from "./components/card_/user-card/user-card.component";
import {EventFilterComponent} from "./components/event-filter/event-filter.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {ReturnButtonComponent} from "./components/return-button/return-button.component";
import {CardEventComponent} from "./components/card_/card-event/card-event.component";
import {EventListDisplayComponent} from "./components/tabs_/event-list-display/event-list-display.component";
import {EventDialogMapsComponent} from "./components/dialog_/event-dialog-maps/event-dialog-maps.component";
import {ProfilUserComponent} from "./components/profil_/profil-user/profil-user.component";
import {ListPostComponent} from "./components/tabs_/list-post/list-post.component";
import {ProfilListEventComponent} from "./components/tabs_/profil-list-event/profil-list-event.component";
import {ListUserComponent} from "./components/tabs_/list-user/list-user.component";
import {ProfilOrganisationComponent} from "./components/profil_/profil-organisation/profil-organisation.component";
import {ListOrganisationSuggestionComponent} from "./components/list-organisation-suggestion/list-organisation-suggestion.component";
import {CardOrganisationComponent} from "./components/card_/card-organisation/card-organisation.component";
import {CreateOrganisationComponent} from "./components/create_/create-organisation/create-organisation.component";
import {A11yModule} from "@angular/cdk/a11y";
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
import {CreatePostComponent} from "./components/create_/create-post/create-post.component";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {CardUserMangeEventComponent} from "./components/card_/card-user-mange-event/card-user-mange-event.component";
import {CardUserManageOrganisationComponent} from "./components/card_/card-user-manage-organisation/card-user-manage-organisation.component";
import {DialogResFriendshipRequestComponent} from "./components/dialog_/dialog-res-friendship-request/dialog-res-friendship-request.component";
import {DialogReportComponent} from "./components/dialog_/dialog-report/dialog-report.component";
import {PostListComponent} from "./components/post-list/post-list.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ScrollingModule as ExperimentalScrollingModule} from "@angular/cdk-experimental/scrolling";
import {DialogUpdateOrganisationComponent} from "./components/dialog_/dialog-update-organisation/dialog-update-organisation.component";
import {DialogUpdateEventComponent} from "./components/dialog_/dialog-update-event/dialog-update-event.component";
import {DialogCreateEventComponent} from "./components/dialog_/dialog-create-event/dialog-create-event.component";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {PostPageComponent} from "./components/page_/post-page/post-page.component";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    NavbarComponent,
    MessageComponent,
    TimelineComponent,
    PostListComponent,
    RegisterComponent,
    CreatePostComponent,
    ConversationComponent,
    EventSuggestionComponent,
    ListEventSuggestionComponent,
    PageEventComponent,
    EventInfosComponent,
    UserCardComponent,
    EventFilterComponent,
    PageListEventComponent,
    ReturnButtonComponent,
    CardEventComponent,
    EventListDisplayComponent,
    EventDialogMapsComponent,
    ProfilUserComponent,
    ListPostComponent,
    ListUserComponent,
    ProfilOrganisationComponent,
    ProfilListEventComponent,
    ListOrganisationSuggestionComponent,
    CardOrganisationComponent,
    CreateOrganisationComponent,
    ConversationBoxDirective,
    ConversationsBoxComponent,
    ConversationCardComponent,
    ConversationsListComponent,
    CardUserMangeEventComponent,
    CardUserManageOrganisationComponent,
    DialogResFriendshipRequestComponent,
    DialogReportComponent,
    DialogUpdateOrganisationComponent,
    DialogUpdateEventComponent,
    DialogCreateEventComponent,
    SearchBarComponent,
    PostPageComponent
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
    FormsModule,
    HttpClientModule,
    A11yModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot(),
    FormsModule,
    PickerModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, MaterialModule],
  providers: [AuthGuardService, NegateAuthGuardService, ConversationBoxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
