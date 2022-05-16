import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppReducersEnum } from 'src/app/core/store';
import { AuthEffects } from './auth.effect';
import { AuthReducer } from './auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AppReducersEnum.auth, AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {}
