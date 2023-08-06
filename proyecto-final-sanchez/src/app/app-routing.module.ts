import {  NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UsersComponent } from './dashboard/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { TeachersComponent } from './dashboard/teachers/teachers.component';
import { HomeComponent } from './dashboard/home/home.component';

const routes: Routes = [
    {
        path: 'dashboard',
        children:[
            {
                path:'home',
                component:HomeComponent
            } ,   
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'students',
                component: StudentsComponent
            },
            {
                path: 'teachers',
                component: TeachersComponent
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard/home'
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]

})
export class AppRoutingModule {}