import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AppErrorState } from '.';
import * as actions from './error.actions';

export const initialState: AppErrorState = {
  errorMessage: undefined,
  isError: false,
  isToasterError: false,
};

export const AppErrorsReducer: ActionReducer<AppErrorState, Action> =
  createReducer(
    initialState,
    on(actions.error, (state: AppErrorState, { payload }): AppErrorState => {
      const { errorMessage, isError, isToasterError } = payload;
      return { ...state, errorMessage, isError, isToasterError };
    }),
    on(
      actions.clearError,
      (state: AppErrorState): AppErrorState => ({ ...state, ...initialState })
    )
  );
