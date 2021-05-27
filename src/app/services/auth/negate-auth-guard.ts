import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthGuardService} from "./auth-guard.service";

@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuardService implements CanActivate {
  constructor(private authGuard: AuthGuardService, public router: Router) {}
  canActivate(): boolean {
    if(!this.authGuard.canActivate()){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
