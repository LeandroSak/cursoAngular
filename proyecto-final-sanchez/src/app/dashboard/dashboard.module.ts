import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoursesModule } from './courses/courses.module';
import { IncriptionModule } from './inscription/inscription.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    StudentsModule,
    RouterModule,
    UsersModule,
    MatListModule,
    CoursesModule,
    IncriptionModule,
    DashboardRoutingModule,
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
