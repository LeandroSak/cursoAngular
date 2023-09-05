import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CoursesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
