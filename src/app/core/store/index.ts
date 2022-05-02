import { AuthState } from "src/app/modules/auth/store";
import { AppErrorState } from "./errors";

export enum AppReducersEnum {
  auth = 'auth',
  appErrors = 'appErrors'
}

export interface AppState {
  auth: AuthState;
  appErrors: AppErrorState;
};
