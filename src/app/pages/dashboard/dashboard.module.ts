import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
