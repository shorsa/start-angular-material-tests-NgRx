import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import {
  AuthReducer,
  initialState as authInitialState,
} from 'src/app/modules/auth/store/auth.reducer';
import { environment } from 'src/environments/environment';
import { AppState } from '.';
import {
  AppErrorsReducer,
  initialState as errorsInitialState,
} from './errors/errors.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  appErrors: AppErrorsReducer,
};

const initialAppState: AppState = {
  auth: authInitialState,
  appErrors: errorsInitialState,
};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState = initialAppState, action: Action): any => {
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
