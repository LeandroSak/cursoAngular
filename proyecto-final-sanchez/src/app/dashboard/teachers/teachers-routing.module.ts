import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'teachers',
        component: TeachersComponent,
      }
      
    ])
  ],
  exports: [RouterModule],
})
export class TeachersRoutingModule { }