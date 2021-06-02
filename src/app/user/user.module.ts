import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user-page/user-page.component';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbListModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { RouterModule } from '@angular/router';
import { BeaconPointComponent } from './beacon-point/beacon-point.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { EditPromoComponent } from './edit-promo/edit-promo.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserChangePassComponent } from './user-change-pass/user-change-pass.component';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [UserPageComponent, BeaconPointComponent,
     ContactUsComponent, MainPanelComponent, EditPromoComponent, UserChangePassComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NbLayoutModule,
    ThemeModule,
    NbListModule,
    NbCardModule,
    NbMenuModule,
    NbSpinnerModule,
    NbSidebarModule,
    NgxDatatableModule,
    RouterModule,
    NbButtonModule,
    LightboxModule ,
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
})
export class UserModule { }
