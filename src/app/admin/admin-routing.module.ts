import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from '@nebular/theme';
import { AuthGuard } from 'app/services/auth.guard';
import { AddUserComponent } from './admin-user/add-user/add-user.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppsAddComponent } from './cinema-apps/apps-add/apps-add.component';
import { AppsEditComponent } from './cinema-apps/apps-edit/apps-edit.component';
import { AppsListComponent } from './cinema-apps/apps-list/apps-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {CinemaListComponent} from './cinema/cinema-list/cinema-list.component';
import {CinemaEditComponent} from './cinema/cinema-edit/cinema-edit.component';
import {CinemaAddComponent} from './cinema/cinema-add/cinema-add.component';
import { MainImageComponent } from './main-image/main-image.component';
import { MobileUserComponent } from './mobile-user/mobile-user.component';
import { NewAdminPageComponent } from './new-admin-page/new-admin-page.component';
import { SliderComponent } from './slider/slider.component';
import { EditUserComponent } from './app-user/edit-user/edit-user.component';
import { ListAppUserComponent } from './app-user/list-app-user/list-app-user.component';
import { OfferAddComponent } from './offers/offer-add/offer-add.component';
import {OfferEditComponent} from './offers/offer-edit/offer-edit.component';
import {OfferListComponent} from './offers/offer-list/offer-list.component';
import {CardComponent} from './card/card.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminPageComponent,
      },
      {
        path: 'new',
        component: NewAdminPageComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path : 'app-user',
        component : ListAppUserComponent,
      },
      {
        path: 'edit-user',
        component: EditUserComponent,
      },
      {
        path: 'mobile-user',
        component: MobileUserComponent,
      },
      {
        path: 'main-image',
        component: MainImageComponent,
      },
      {
        path: 'cinema',
        children: [
          {
            path: '',
            component: CinemaListComponent,
          },
          {
            path: 'cinema-add',
            component: CinemaAddComponent,
          },
          {
            path: 'cinema-edit',
            component: CinemaEditComponent,
          },
        ],
      },
      {
        path: 'cinema-apps',
        children: [
          {
            path: '',
            component: AppsListComponent,
          },
          {
            path: 'apps-add',
            component: AppsAddComponent,
          },
          {
            path: 'apps-edit',
            component: AppsEditComponent,
          },
        ],
      },
      {
        path: 'slider',
        component: SliderComponent,
      },
      {
        path: 'card',
        component: CardComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'offer',
        children: [
          {
            path: '',
            component: OfferListComponent,
          },
          {
            path: 'addCard',
            component: OfferAddComponent,
          },
          {
            path: 'editCard',
            component: OfferEditComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
