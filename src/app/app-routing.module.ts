import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {ProfilUserComponent} from "./components/profil_/profil-user/profil-user.component";
import {ProfilOrganisationComponent} from "./components/profil_/profil-organisation/profil-organisation.component";

const appRoutes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'events', component: PageListEventComponent},
  { path: 'event_/:id', component: PageEventComponent },
  { path: 'user/:username', component: ProfilUserComponent },
  { path: 'organisation/:organisationName', component: ProfilOrganisationComponent },
  { path: '',   redirectTo: '/timeline', pathMatch: 'full' }
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
