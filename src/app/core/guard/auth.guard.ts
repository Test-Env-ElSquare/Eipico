import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService, LoginResponse } from '../services/Auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //get user value
    let CurrentUser = this.authService.CurrentUser;
    //get token expiration date
    let CureentUser = this.authService.CurrentUser?.user;
    //get token expiration date time
    let exp = new Date(CureentUser).getTime();
    //get current date time
    let currentYear = new Date().getTime();
    // check if current date time > token expiration date time
    // and if so we logout the user and redirect to login page

    if (CurrentUser && CurrentUser.token) {
      if (exp && currentYear) {
        if (exp > currentYear) {
          return true;
        } else {
          this.authService.logOut();
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      }
    }

    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
