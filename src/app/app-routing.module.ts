import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule),
  },
   {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),

  },
  // {
  //   path: 'user',
  //   canActivate: [AuthGuard],
  //   data: {role: 'user'},
  //   loadChildren: () => import('./admin/admin.module')
  //     .then(m => m.AdminModule),
  // },



   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '**', redirectTo: 'login' },
    //  changed by danish

  // { path: '', redirectTo: 'admin', pathMatch: 'full' },
  // { path: '**', redirectTo: 'admin' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
