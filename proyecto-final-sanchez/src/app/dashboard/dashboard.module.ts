import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list'
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    StudentsModule,
    TeachersModule,
    RouterModule,
    UsersModule,
    MatListModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
