import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppReducersEnum } from '..';
import { AppErrorsReducer } from './errors.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AppReducersEnum.appErrors, AppErrorsReducer),
  ],
})
export class ErrorsStoreModule {}
