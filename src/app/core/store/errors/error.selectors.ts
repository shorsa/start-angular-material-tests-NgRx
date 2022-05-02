import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppReducersEnum } from '..';
import { AppErrorState } from './index';

const selectErrorsFeature = createFeatureSelector<AppErrorState>(AppReducersEnum.appErrors);

export const selectErrors = createSelector(selectErrorsFeature, (state: AppErrorState) => state);
