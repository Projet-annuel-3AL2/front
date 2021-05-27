import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const appRoutes: Routes = [
  { path: '', component: TimelineComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule {
}
