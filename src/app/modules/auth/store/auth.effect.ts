import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src/models';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import * as errorsActions from 'src/app/core/store/errors/error.actions';
import {
  RequestSignInModel,
  ResponseSignInModel,
} from 'src/app/shared/models/auth/sign-in';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private readonly authService: AuthService) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signIn),
      switchMap((action: Action & { payload: RequestSignInModel }) => {
        return this.authService.signIn(action.payload).pipe(
          map((data: ResponseSignInModel) => {
            console.log(data);

            return authActions.signInSuccess({ payload: data });
          }),
          catchError((error) => {
            return errorsActions.catchErrorEffect(error);
          })
        );
      })
    );
  });
}
