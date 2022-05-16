import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationHelper } from 'src/app/core/helpers/authentication.helper';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authHelper: AuthenticationHelper,
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error): Observable<never> => {
        console.error(error);

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authHelper.signOut();
          return throwError(error);
        }

        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.authHelper.signOut();
          return throwError(error);
        } else {
          // this.toastrService.error(error.error);
          return throwError(error);
        }
      })
    );
  }
}
