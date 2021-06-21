import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {EventSuggestionComponent} from "./components/event/event-suggestion/event-suggestion.component";
import {EventSuggestionListComponent} from "./components/event/event-suggestion-list/event-suggestion-list.component";
import {EventComponent} from "./components/event/event/event.component";
import {EventInfosComponent} from "./components/event/event-infos/event-infos.component";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {EventFilterComponent} from "./components/event/event-filter/event-filter.component";
import {EventListComponent} from "./components/event/event-list/event-list.component";
import {ReturnButtonComponent} from "./components/return-button/return-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventCardComponent} from "./components/event/event-card/event-card.component";
import {EventListDisplayComponent} from "./components/event/event-list-display/event-list-display.component";
import {EventDialogMapsComponent} from "./components/event/event-dialog-maps/event-dialog-maps.component";
import {ProfilUserComponent} from "./components/profil/profil-user/profil-user.component";
import {ListPostComponent} from "./components/list-post/list-post.component";
import {ProfilListEventComponent} from "./components/profil/profil-list-event/profil-list-event.component";
import {ListUserComponent} from "./components/list-user/list-user.component";
import {ProfilOrganisationComponent} from "./components/profil/profil-organisation/profil-organisation.component";
import {HttpClientModule} from "@angular/common/http";
import {OrgaSuggestionListComponent} from "./components/orga-suggestion-list/orga-suggestion-list.component";
import {OrganisationCardComponent} from "./components/organisation-card/organisation-card.component";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent,
    TimelineComponent,
    EventSuggestionComponent,
    EventSuggestionListComponent,
    EventComponent,
    EventInfosComponent,
    UserCardComponent,
    EventFilterComponent,
    EventListComponent,
    ReturnButtonComponent,
    EventCardComponent,
    EventListDisplayComponent,
    EventDialogMapsComponent,
    ProfilUserComponent,
    ListPostComponent,
    ListUserComponent,
    ProfilOrganisationComponent,
    ProfilListEventComponent,
    OrgaSuggestionListComponent,
    OrganisationCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
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
    HttpClientModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
