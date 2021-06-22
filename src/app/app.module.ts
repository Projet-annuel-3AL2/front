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
import {EventFilterComponent} from "./components/event_/event-filter/event-filter.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {ReturnButtonComponent} from "./components/return-button/return-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardEventComponent} from "./components/card_/card-event/card-event.component";
import {EventListDisplayComponent} from "./components/event_/event-list-display/event-list-display.component";
import {EventDialogMapsComponent} from "./components/event_/event-dialog-maps/event-dialog-maps.component";
import {ProfilUserComponent} from "./components/profil_/profil-user/profil-user.component";
import {ListPostComponent} from "./components/tabs_/list-post/list-post.component";
import {ProfilListEventComponent} from "./components/tabs_/profil-list-event/profil-list-event.component";
import {ListUserComponent} from "./components/tabs_/list-user/list-user.component";
import {ProfilOrganisationComponent} from "./components/profil_/profil-organisation/profil-organisation.component";
import {HttpClientModule} from "@angular/common/http";
import {ListOrganisationSuggestionComponent} from "./components/tabs_/list-organisation-suggestion/list-organisation-suggestion..component";
import {CardOrganisationComponent} from "./components/card_/card-organisation/card-organisation.component";
import {CreateEventComponent} from "./components/create_/create-event/create-event.component";
import {CreateOrganisationComponent} from "./components/create_/create-organisation/create-organisation.component";
import {A11yModule} from "@angular/cdk/a11y";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent,
    TimelineComponent,
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
    CreateEventComponent,
    CreateOrganisationComponent
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
    HttpClientModule,
    A11yModule
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
