import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { LocalStorageHelper, LocalStorageTokenData } from "./local-storage.helper";
import { NavigationHelper } from "./navigation.helper";

@Injectable({
  providedIn: "root",
})
export class AuthenticationHelper {
  private tokenData?: LocalStorageTokenData;
  private loginSuccess$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly localStorageHelper: LocalStorageHelper,
    private readonly navigationHelper: NavigationHelper
  ) {
    this.tokenData = this.localStorageHelper.getLocalStorageToken;
  }

  get loginSuccess(): boolean {
    return this.loginSuccess$.value;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.tokenData) {
        const data = this.localStorageHelper.getLocalStorageToken;
        resolve(!!data);
      } else {
        resolve(!!this.tokenData);
      }
    });
  }

  signIn(data: LocalStorageTokenData): void {
    this.tokenData = data;
    this.localStorageHelper.setLocalStorageToken = this.tokenData;
    this.loginSuccess$.next(true);
  }

  setTokens(data: LocalStorageTokenData): void {
    this.tokenData = data;
    this.localStorageHelper.setLocalStorageToken = this.tokenData;
  }

  signOut(): void {
    this.tokenData = undefined;
    this.localStorageHelper.removeLocalStorageToken();
    this.loginSuccess$.next(false);
    this.navigationHelper.toAuth();
  }

  getAccessToken(): string | undefined {
    if (this.tokenData) {
      return this.tokenData.accessToken;
    }
    return undefined;
  }

  getRefreshToken(): string | undefined {
    if (this.tokenData) {
      return this.tokenData.refreshToken;
    }
    return undefined;
  }

  getUserId(): string | null {
    const userId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    const token: string | undefined = this.getAccessToken();
    try {
      if (!token) return null;
      const tokenData = jwt_decode(token) as any;
      return tokenData[userId];
    } catch (error) {
      return null;
    }
  }

  getUserEmail(): string | null {
    const userEmail = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    const token: string | undefined = this.getAccessToken();
    try {
      if (!token) return null;

      const tokenData = jwt_decode(token) as any;
      return tokenData[userEmail];
    } catch (error) {
      return null;
    }
  }

  getUserName(): string | null {
    const userName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    const token: string | undefined = this.getAccessToken();
    try {
      if (!token) return null;

      const tokenData = jwt_decode(token) as any;
      return tokenData[userName];
    } catch (error) {
      return null;
    }
  }

  getUserRole(): string | null {
    const claimsRole = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const token: string | undefined = this.getAccessToken();
    try {
      if (!token) return null;

      const tokenData = jwt_decode(token) as any;
      const role: string = tokenData[claimsRole];
      return role;
    } catch (error) {
      return null;
    }
  }
}
