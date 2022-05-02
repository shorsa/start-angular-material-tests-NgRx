import { NavigationExtras, Router } from '@angular/router';
import { InjectorInstance } from 'src/app/app.module';
import { RoutesConstants } from '../constants';

export class NavigationHelper {

  public static toAuth(route?: string): void {
    if (!route) {
      this.navigate([RoutesConstants.AUTH_INDEX]);
      return;
    }
    this.navigate([RoutesConstants.AUTH_INDEX].concat(route));
  }

  public static navigate(route: string[], params?: NavigationExtras): void {
    const router: Router = InjectorInstance.get(Router);
    router.navigate(route, params);
  }
}
