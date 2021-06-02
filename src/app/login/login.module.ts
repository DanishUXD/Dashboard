import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbButtonModule,
    RouterModule,
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot(),
  ],
})
export class LoginModule { }
