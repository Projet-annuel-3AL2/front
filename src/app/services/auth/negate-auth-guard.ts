import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, public router: Router) {
  }

  canActivate(): boolean | UrlTree {
    return this.auth.isAuthenticated() ? this.router.parseUrl("/") : true;
  }
}
