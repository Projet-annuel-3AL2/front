import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {EventComponent} from "./components/event/event.component";
import {EventListComponent} from "./components/event-list/event-list.component";

const appRoutes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'events', component: EventListComponent},
  { path: 'event/:id', component: EventComponent },
  { path: '',   redirectTo: '/timeline', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule {
}
