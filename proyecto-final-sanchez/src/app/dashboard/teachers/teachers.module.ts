import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { TeachersDialogComponent } from './components/teachers-dialog/teachers-dialog.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TeachersComponent,
    TeachersDialogComponent,
    TeachersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    TeachersComponent
  ]
})
export class TeachersModule { }