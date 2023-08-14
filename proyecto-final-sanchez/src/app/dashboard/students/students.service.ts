import { Injectable } from '@angular/core';
import { Student, createStudent, updateStudent } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }


  loadStudents(): void {
    this.httpClient.get<Student[]>('http://localhost:3000/students', {
    }).subscribe({
      next: (response) => {
        this._students$.next(response);
      }
      , error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los estudiantes',
          confirmButtonColor: '#673ab7'
        })
      }
    })
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }



  createStudent(student: createStudent): void {
    this.httpClient.post<Student>('http://localhost:3000/students', student)
      .pipe(
        mergeMap((studentsCreate) => this.students$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, studentsCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._students$.next(arrayActualizado);
        }
      })
  }

  updateStudentById(id: number, usuarioActualizado: updateStudent): void {
    this.httpClient.put('http://localhost:3000/students/' + id, usuarioActualizado).subscribe({
      next: () => this.loadStudents(),
    })
  }


  deleteStudentById(id: number): void {
    this.httpClient.delete('http://localhost:3000/students/' + id)
      .subscribe({
        next: () => this.loadStudents(),
      })
  }
}
