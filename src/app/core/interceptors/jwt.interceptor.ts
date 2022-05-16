import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationHelper } from '../helpers/authentication.helper';
import { AuthService } from './../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private readonly authHelper: AuthenticationHelper,
    private readonly authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken: string | undefined = this.authHelper.getAccessToken();

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorizedError(request, next, error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    const model: any = { refreshToken: this.authHelper.getRefreshToken() };

    return this.authService.refreshToken(model).pipe(
      switchMap((responseModel: any): Observable<HttpEvent<any>> => {
        if (!responseModel.isSuccessful) {
          this.authHelper.signOut();
          return throwError(responseModel);
        }
        this.authHelper.setTokens(responseModel);
        this.refreshTokenSubject.next(responseModel.accessToken);
        return next.handle(this.addToken(request, responseModel.accessToken));
      }),
      catchError((response: any) => {
        this.authHelper.signOut();
        return throwError(response);
      })
    );
    // return throwError(error);
  }
}
