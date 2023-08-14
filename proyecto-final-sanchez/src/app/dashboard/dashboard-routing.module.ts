import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then((m) => m.TeachersModule)
      },
      {
        path: 'students',
       loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
      },
      

    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}