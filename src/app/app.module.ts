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
import {EventComponent} from "./components/event/event.component";
import {EventAccueilComponent} from "./components/event-accueil/event-accueil.component";
import {EventInfosComponent} from "./components/event-infos/event-infos.component";
import {EventParticipantsComponent} from "./components/event-participants/event-participants.component";
import {UserCardComponent} from "./components/user-card/user-card.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {EventFilterComponent} from "./components/event-filter/event-filter.component";
import {EventListComponent} from "./components/event-list/event-list.component";
import {ReturnButtonComponent} from "./components/return-button/return-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventCardComponent} from "./components/event-card/event-card.component";
import {EventListDisplayComponent} from "./components/event-list-display/event-list-display.component";
import {EventDialogMapsComponent} from "./components/event-dialog-maps/event-dialog-maps.component";

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
    EventAccueilComponent,
    EventParticipantsComponent,
    UserCardComponent,
    EventFilterComponent,
    EventListComponent,
    ReturnButtonComponent,
    EventCardComponent,
    EventListDisplayComponent,
    EventDialogMapsComponent
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
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
