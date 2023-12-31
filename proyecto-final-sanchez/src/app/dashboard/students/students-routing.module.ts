import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'students',
        component: StudentsComponent,
      }
      
    ])
  ],
  exports: [RouterModule],
})
export class StudentsRoutingModule { }