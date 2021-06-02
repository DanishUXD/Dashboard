import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NbLayoutModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SignupRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    RouterModule,
    NbToastrModule.forRoot(),

    NbSidebarModule.forRoot(),
  ],
})
export class SignupModule { }

