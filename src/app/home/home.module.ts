import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
    RouterModule,
    NbSidebarModule.forRoot(),
  ],
})
export class HomeModule { }
