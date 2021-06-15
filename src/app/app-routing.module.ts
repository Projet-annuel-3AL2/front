import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {EventComponent} from "./components/event/event/event.component";
import {EventListComponent} from "./components/event/event-list/event-list.component";
import {ProfilUserComponent} from "./components/profil/profil-user/profil-user.component";
import {ProfilOrganisationComponent} from "./components/profil/profil-organisation/profil-organisation.component";

const appRoutes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'events', component: EventListComponent},
  { path: 'event/:id', component: EventComponent },
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
