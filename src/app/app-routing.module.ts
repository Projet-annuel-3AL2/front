import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";
import {PageEventComponent} from "./components/page_/page-event/page-event.component";
import {PageListEventComponent} from "./components/page_/page-list-event/page-list-event.component";
import {ProfileUserComponent} from "./components/profil_/profile-user/profile-user.component";
import {ProfileOrganisationComponent} from "./components/profil_/profil-organisation/profile-organisation.component";
import {LoginComponent} from "./components/page_/auth_/login/login.component";
import {RegisterComponent} from "./components/page_/auth_/register/register.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {NegateAuthGuardService} from "./services/auth/negate-auth-guard";
import {PostPageComponent} from "./components/page_/post-page/post-page.component";
import {ForgotPasswordComponent} from "./components/page_/auth_/forgot-password/forgot-password.component";
import {PasswordRecoveryComponent} from "./components/page_/auth_/password-recovery/password-recovery.component";
import {FriendsPageComponent} from "./components/page_/friends-page/friends-page.component";
import {PageAskJoinOrganisationComponent} from "./components/page_/page-ask-join-organisation/page-ask-join-organisation.component";

const appRoutes: Routes = [
  {path: '', component: TimelineComponent, canActivate: [AuthGuardService]},
  {path: 'friends', component: FriendsPageComponent, canActivate: [AuthGuardService]},
  {path: 'my-organisations', component: PageAskJoinOrganisationComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [NegateAuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [NegateAuthGuardService]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NegateAuthGuardService]},
  {
    path: 'reset-password/:username/:resetToken',
    component: PasswordRecoveryComponent,
    canActivate: [NegateAuthGuardService]
  },
  {path: 'events', component: PageListEventComponent},
  {path: 'event/:eventId', component: PageEventComponent},
  {path: 'user/:username', component: ProfileUserComponent},
  {path: 'organisation/:id', component: ProfileOrganisationComponent},
  {path: 'post/:postId', component: PostPageComponent},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
