import { Injectable } from '@angular/core';
import { Student, createStudent, updateStudent } from './models';
import { BehaviorSubject, Observable, take } from 'rxjs';



const data : Student[]=[{
  id:1,
  name:"Juan",
  lastname:"Perez",
  email:"juan@email.com",
  age:20
},
{
  id:2,
  name:"Maria",
  lastname:"Molina",
  email:"maria@mail.com",
  age:21
},
{id:3,
  name:"Jose",
  lastname:"Sanchez",
  email:"jose@mail.com",
  age:21},
{id:4,
  name:"Claudia",
  lastname:"Molina",
  email:"claudia@mail.com",
  age:31}]


@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  constructor() { }




  loadStudents():void{
    this._students$.next(data)
  }

  getStudents(): Observable<Student[]> {
    return this._students$;
  }



  createStudent(student: createStudent): void {

    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next([
          ...arrayActual,
          { ...student, id: arrayActual[arrayActual.length - 1].id + 1 },
        ]);
      },
    });}

    updateStudentById(id: number, usuarioActualizado: updateStudent): void {
      this.students$.pipe(take(1)).subscribe({
        next: (arrayActual) => {
          this._students$.next(
            arrayActual.map((student) =>
            student.id === id ? { ...student, ...usuarioActualizado } : student
            )
          );
        },
      });
  }


  deleteStudentById(id: number): void {
    this._students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next(arrayActual.filter((student) => student.id !== id));
      },
    });
  }
}
