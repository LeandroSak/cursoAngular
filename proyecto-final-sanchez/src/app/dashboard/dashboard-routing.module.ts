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
        path: 'students',
       loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'courses',
       loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'inscriptions',
       loadChildren: () => import('./inscription/inscription.module').then((m) => m.IncriptionModule),
      },
      

    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}