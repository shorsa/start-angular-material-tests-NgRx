import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { metaReducers, reducers } from './core/store/app-meta.reducer';
import { ErrorsStoreModule } from './core/store/errors/errors.store.module';
import { AuthStoreModule } from './modules/auth/store/auth.store.module';

export let InjectorInstance: Injector;

const STORE = [
  AuthStoreModule,
  ErrorsStoreModule,

  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
  EffectsModule.forRoot([]),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    STORE,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      tapToDismiss: true,
      progressBar: true,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
