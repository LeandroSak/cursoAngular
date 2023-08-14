import { Injectable } from '@angular/core';
import { Teacher, createTeacher, updateTeacher } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private _teachers$ = new BehaviorSubject<Teacher[]>([]);
  private teachers$ = this._teachers$.asObservable();


  constructor(
    private httpClient: HttpClient
  ) { }

  loadTeachers(): void {
    this.httpClient.get<Teacher[]>('http://localhost:3000/teachers', {
    }).subscribe({
      next: (response) => {
        this._teachers$.next(response);
      }
      , error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los profesores',
          confirmButtonColor: '#673ab7'
        })
      }
    })
  }

  getTeachers(): Observable<Teacher[]> {
    return this._teachers$;
  }

  createTeacher(teacher: createTeacher): void {
    this.httpClient.post<Teacher>('http://localhost:3000/teachers', teacher)
      .pipe(
        mergeMap((teacherCreate) => this.teachers$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, teacherCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._teachers$.next(arrayActualizado);
        }
      })
  }

  updateTeacherById(id: number, teacherActualizado: updateTeacher): void {
    this.httpClient.put('http://localhost:3000/teachers/' + id, teacherActualizado).subscribe({
      next: () => this.loadTeachers(),
    })
  }


  deleteTeacherById(id: number): void {
    this.httpClient.delete('http://localhost:3000/teachers/' + id)
      .subscribe({
        next: () => this.loadTeachers(),
      })
  }
}
