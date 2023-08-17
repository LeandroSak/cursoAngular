import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UsersModule } from './users/users.module';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list'
import { DashboardRoutingModule } from './dashboard-routing.module';
@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,

    RouterModule,
    UsersModule,
    MatListModule,
    DashboardRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
