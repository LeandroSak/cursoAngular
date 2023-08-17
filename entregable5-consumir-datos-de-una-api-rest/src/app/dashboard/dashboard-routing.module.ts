import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";



@NgModule({
  imports: [
    RouterModule.forChild([

      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      }

    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}