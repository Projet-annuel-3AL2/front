import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(): boolean | UrlTree {
    return !this.auth.isAuthenticated() ? this.router.parseUrl("/login") : true;
  }
}
