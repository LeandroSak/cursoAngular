import { Injectable } from '@angular/core';
import { Teacher, createTeacher, updateTeacher } from './models';
import { BehaviorSubject, Observable, take } from 'rxjs';

const data : Teacher[]=[{
  id:1,
  name:"Juan",
  lastname:"Perez",
  email:"juan@email.com",

},
{
  id:2,
  name:"Maria",
  lastname:"Molina",
  email:"maria@mail.com",

},
{id:3,
  name:"Jose",
  lastname:"Sanchez",
  email:"jose@mail.com",
},
{id:4,
  name:"Claudia",
  lastname:"Molina",
  email:"claudia@mail.com",
}]

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private _teachers$ = new BehaviorSubject<Teacher[]>([]);
  private teachers$ = this._teachers$.asObservable();


  constructor() { }

  loadTeachers():void{
    this._teachers$.next(data)
  }

  getTeachers(): Observable<Teacher[]> {
    return this._teachers$;
  }



  createTeacher(teacher: createTeacher): void {

    this.teachers$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._teachers$.next([
          ...arrayActual,
          { ...teacher, id: arrayActual[arrayActual.length - 1].id + 1 },
        ]);
      },
    });}

    updateTeacherById(id: number, teacherActualizado: updateTeacher): void {
      this.teachers$.pipe(take(1)).subscribe({
        next: (arrayActual) => {
          this._teachers$.next(
            arrayActual.map((teacher) =>
            teacher.id === id ? { ...teacher, ...teacherActualizado } : teacher
            )
          );
        },
      });
  }


  deleteTeacherById(id: number): void {
    this._teachers$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._teachers$.next(arrayActual.filter((teacher) => teacher.id !== id));
      },
    });
  }
}
