import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthenticationHelper } from 'src/app/core/helpers/authentication.helper';
import { NavigationHelper } from '../helpers/navigation.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationHelper: AuthenticationHelper) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const isAuthenticated: boolean = await this.authenticationHelper.isAuthenticated().then(res => res);

    if (isAuthenticated) {
      return true;
    }
    NavigationHelper.toAuth(RoutesConstants.SIGN_IN);
    return false;
  }

}
