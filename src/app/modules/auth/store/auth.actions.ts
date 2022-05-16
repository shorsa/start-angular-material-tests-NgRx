import { createAction, props } from '@ngrx/store';
import {
  RequestSignInModel,
  ResponseSignInModel,
} from 'src/app/shared/models/auth/sign-in';

const SIGN_IN = '[AUTH] sign in';
export const signIn = createAction(
  SIGN_IN,
  props<{ payload: RequestSignInModel }>()
);

const SIGN_IN_SUCCESS = '[AUTH] [API] sign in success';
export const signInSuccess = createAction(
  SIGN_IN_SUCCESS,
  props<{ payload: ResponseSignInModel }>()
);
