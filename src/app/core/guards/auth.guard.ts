import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthenticationHelper } from 'src/app/core/helpers/authentication.helper';
import { NavigationHelper } from '../helpers/navigation.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private navigationHelper: NavigationHelper,
    private authenticationHelper: AuthenticationHelper
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated: boolean = await this.authenticationHelper
      .isAuthenticated()
      .then((res: boolean) => res);

    if (isAuthenticated) {
      return true;
    }
    this.navigationHelper.toAuth(RoutesConstants.SIGN_IN);
    return false;
  }
}
