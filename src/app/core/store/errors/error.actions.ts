import { AppErrorState } from '.';
import { createAction, props } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpResponseBase } from '@angular/common/http';

const ERROR = '[APP] Error';
export const error = createAction(ERROR, props<{ payload: AppErrorState }>());

const CLEAR_ERROR = '[APP] Error clear';
export const clearError = createAction(CLEAR_ERROR);

export const catchErrorEffect = (errorResponse: any) => {
    if (errorResponse instanceof HttpResponseBase) {
        const { url, statusText } = errorResponse;
        return of(error({
            payload: {
                isError: true,
                errorMessage: `${url} - ${statusText}`,
                isToasterError: true
            }
        }));
    }
    return of(error({
        payload: {
            isError: true,
            errorMessage: `${error}`,
            isToasterError: true
        }
    }));
}

