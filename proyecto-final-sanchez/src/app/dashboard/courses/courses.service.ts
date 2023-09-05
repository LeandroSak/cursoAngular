import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Course, createCourse, updateCourse } from './models';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  loadCourses(): void {
    this.httpClient.get<Course[]>(environment.baseUrl +'courses', {
    }).subscribe({
      next: (response) => {
        this._courses$.next(response);
      }
      , error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los cursos',
          confirmButtonColor: '#673ab7'
        })
      }
    })
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }



  createCourse(course: createCourse): void {
    this.httpClient.post<Course>(environment.baseUrl +'courses', course)
      .pipe(
        mergeMap((coursesCreate) => this.courses$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, coursesCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._courses$.next(arrayActualizado);
        }
      })
  }

  updateCourseById(id: number, cursoActualizado: updateCourse): void {
    this.httpClient.put(environment.baseUrl +'courses' + id, cursoActualizado).subscribe({
      next: () => this.loadCourses(),
    })
  }


  deleteCourseById(id: number): void {
    this.httpClient.delete(environment.baseUrl +'courses' + id)
      .subscribe({
        next: () => this.loadCourses(),
      })
  }
}
