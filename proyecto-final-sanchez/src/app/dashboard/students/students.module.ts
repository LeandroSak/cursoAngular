import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { 

 
}
