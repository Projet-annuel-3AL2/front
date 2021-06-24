import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {ProfilUserComponent} from "./components/profil_/profil-user/profil-user.component";
import {ProfilOrganisationComponent} from "./components/profil_/profil-organisation/profil-organisation.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";

const appRoutes: Routes = [
  {path: '', component: TimelineComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [NegateAuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
  { path: 'timeline', component: TimelineComponent },
  { path: 'events', component: PageListEventComponent},
  { path: 'event/:id', component: PageEventComponent },
  { path: 'user/:username', component: ProfilUserComponent },
  { path: 'organisation/:organisationName', component: ProfilOrganisationComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
