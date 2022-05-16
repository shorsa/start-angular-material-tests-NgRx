import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from './core/constants';

const routes: Routes = [
  {
    path: RoutesConstants.AUTH_INDEX,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RoutesConstants.INDEX,
    redirectTo: RoutesConstants.AUTH_INDEX,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: RoutesConstants.AUTH_INDEX,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
