import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'users',
        component: UsersComponent,
      }
      
    ])
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule { }