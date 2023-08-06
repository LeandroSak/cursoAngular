import { Component } from '@angular/core';
import { Student } from './models';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StudentsService } from './students.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  public students: Observable<Student[]>;
constructor(
  private matDialog: MatDialog,
  private studentService: StudentsService,
) {
  this.studentService.loadStudents();
  this.students = this.studentService.getStudents()

  }

  onCreateUser(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.studentService.createStudent({
              name: v.name,
              email: v.email,
              age: v.age,
              lastname: v.lastname
            }) }
          } 
        },
      );
  }

  onDeleteStudent(studentToDelete: Student): void {
    Swal.fire({
      title: `¿Está seguro de eliminar al estudiante ${studentToDelete.name}?`,
      icon: 'warning',
      iconColor:'#673ab7',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudentById(studentToDelete.id);
        Swal.fire({
          title: `Se elimino el estudiante ${studentToDelete.name}`,
          icon: 'success',
          iconColor:'#673ab7',
          confirmButtonColor: '#673ab7',
          confirmButtonText: 'Ok'}
        )
      }
    })
  }


  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: studentToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.studentService.updateStudentById(studentToEdit.id, studentUpdated);
          }
        },
      });
  }
}
