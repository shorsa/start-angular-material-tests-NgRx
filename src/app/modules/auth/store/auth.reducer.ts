import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthState } from '.';
import * as authActions from './auth.actions';

export const initialState: AuthState = {
  accessToken: undefined
};

export const AuthReducer: ActionReducer<AuthState, Action> =
  createReducer(
    initialState,
    on(
      authActions.signInSuccess,
      (state: AuthState, { payload }): AuthState =>
        ({ ...state, accessToken: payload.accessToken })
    ),
  );
