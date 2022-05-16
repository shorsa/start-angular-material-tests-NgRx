import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelper {
  private readonly tokenKey: string = 'TOKEN_DATA_KEY';

  set setLocalStorageToken(tokenData: LocalStorageTokenData) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenData));
  }

  get getLocalStorageToken(): LocalStorageTokenData | undefined {
    const tokenDataString: string | null = localStorage.getItem(this.tokenKey);
    if (!tokenDataString) return undefined;

    return JSON.parse(tokenDataString);
  }

  removeLocalStorageToken(): void { localStorage.removeItem(this.tokenKey); }
}

export interface LocalStorageTokenData {
  accessToken: string;
  refreshToken?: string;
}