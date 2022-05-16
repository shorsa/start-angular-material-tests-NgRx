import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppReducersEnum } from 'src/app/core/store';
import { AuthState } from '.';

const selectAuth = createFeatureSelector<AuthState>(AppReducersEnum.auth);

export const selectAccessToken = createSelector(
  selectAuth,
  (state: AuthState) => state.accessToken
);
