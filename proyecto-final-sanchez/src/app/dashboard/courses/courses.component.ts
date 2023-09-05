import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public courses: Observable<Course[]>;
  public selectIsAdmin$: Observable<boolean>;
constructor(
  private matDialog: MatDialog,
  private courseService: CoursesService,
  private store: Store
) {
  this.courseService.loadCourses();
  this.courses = this.courseService.getCourses()
  this.selectIsAdmin$ = this.store.select(selectIsAdmin);

  }

  onCreateCourse(): void {
    this.matDialog
      .open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.courseService.createCourse({
              name: v.name,
              
            }) }
          } 
        },
      );
  }

  onDeleteCourse(courseToDelete: Course): void {
    Swal.fire({
      title: `¿Está seguro de eliminar al curso ${courseToDelete.name}?`,
      icon: 'warning',
      iconColor:'#673ab7',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseById(courseToDelete.id);
        Swal.fire({
          title: `Se elimino el curso ${courseToDelete.name}`,
          icon: 'success',
          iconColor:'#673ab7',
          confirmButtonColor: '#673ab7',
          confirmButtonText: 'Ok'}
        )
      }
    })
  }


  onEditCourse(courseToEdit: Course): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: courseToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated) {
            this.courseService.updateCourseById(courseToEdit.id, courseUpdated);
          }
        },
      });
  }
}
