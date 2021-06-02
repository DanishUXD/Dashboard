import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from 'app/admin/change-password/change-password.component';
import { BeaconPointComponent } from './beacon-point/beacon-point.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditPromoComponent } from './edit-promo/edit-promo.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { UserChangePassComponent } from './user-change-pass/user-change-pass.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainPanelComponent,
      },
      {
        path: 'beacon-point',
        component: BeaconPointComponent,
      },
      {
        path: 'contactUs',
        component: ContactUsComponent,
      },
      {
        path: 'profile',
        component: UserPageComponent,
      },
      {
        path: 'editPromo',
        component: EditPromoComponent,
      },
      {
        path: 'changePassword',
        component: UserChangePassComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
