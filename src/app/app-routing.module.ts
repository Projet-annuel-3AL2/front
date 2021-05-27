import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";

const appRoutes: Routes = [
  { path: '', component: TimelineComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [NegateAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule {
}
