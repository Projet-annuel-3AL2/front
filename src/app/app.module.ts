import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './navbar/navbar.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {MaterialModule} from "./material.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent
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
export class AppModule { }
