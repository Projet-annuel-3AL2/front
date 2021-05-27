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
    EventParticipantsComponent
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
    AppRoutingModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
