import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesConstants } from "../constants";

@Injectable({
  providedIn: "root",
})
export class NavigationHelper {
  constructor(private router: Router) {}

  toAuth(route?: string): void {
    if (!route) {
      this.router.navigate([RoutesConstants.AUTH_INDEX]);
      return;
    }
    this.router.navigate([RoutesConstants.AUTH_INDEX].concat(route));
  }
}
