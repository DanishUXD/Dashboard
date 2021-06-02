import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NbAutocompleteModule, NbButtonModule, NbCardModule,
  NbCheckboxModule,
  NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbSidebarModule, NbSpinnerModule, NbToastrModule, NbToggleModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ThemeModule } from 'app/@theme/theme.module';
import { AddUserComponent } from './admin-user/add-user/add-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditUserComponent } from './app-user/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { AppsListComponent } from './cinema-apps/apps-list/apps-list.component';
import { AppsAddComponent } from './cinema-apps/apps-add/apps-add.component';
import { AppsEditComponent } from './cinema-apps/apps-edit/apps-edit.component';
import { SliderComponent } from './slider/slider.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MobileUserComponent } from './mobile-user/mobile-user.component';
import { MainImageComponent } from './main-image/main-image.component';
import { NewAdminPageComponent } from './new-admin-page/new-admin-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {CinemaAddComponent} from './cinema/cinema-add/cinema-add.component';
import {CinemaEditComponent} from './cinema/cinema-edit/cinema-edit.component';
import {CinemaListComponent} from './cinema/cinema-list/cinema-list.component';
import { ListAppUserComponent } from './app-user/list-app-user/list-app-user.component';
import { from } from 'rxjs';
import { OfferAddComponent } from './offers/offer-add/offer-add.component';
import { OfferEditComponent } from './offers/offer-edit/offer-edit.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import {CardComponent} from './card/card.component';
@NgModule({

  declarations: [AdminPageComponent, AddUserComponent,
    EditUserComponent, AppsListComponent, CinemaAddComponent, ListAppUserComponent,
    CinemaEditComponent, CinemaListComponent, AppsAddComponent, AppsEditComponent, SliderComponent,
    MobileUserComponent, MainImageComponent, NewAdminPageComponent, ChangePasswordComponent,
    OfferAddComponent, OfferEditComponent, OfferListComponent, CardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NbLayoutModule,
    ThemeModule,
    NbCardModule,
    NbMenuModule,
    NbSidebarModule,
    NbToggleModule,
    RouterModule,
    NbSpinnerModule,
    NbButtonModule,
    NbPopoverModule,
    NgxDatatableModule,
    FormsModule ,
    NbListModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
})
export class AdminModule { }
