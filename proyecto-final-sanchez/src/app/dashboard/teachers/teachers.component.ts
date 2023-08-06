import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Teacher } from './models';
import { TeachersService } from './teachers.service';
import { TeachersDialogComponent } from './components/teachers-dialog/teachers-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  public teachers: Observable<Teacher[]>;

  constructor(
    private matDialog: MatDialog,
    private teacherService: TeachersService,
  ) {
    this.teacherService.loadTeachers();
    this.teachers = this.teacherService.getTeachers()
  
    }


    onCreateTeacher(): void {
      this.matDialog
        .open(TeachersDialogComponent)
        .afterClosed()
        .subscribe({
          next: (teacher) => {
            if (teacher) {
              this.teacherService.createTeacher({
                name: teacher.name,
                email: teacher.email,
                lastname: teacher.lastname
              }) }
            } 
          },
        );
    }

    onDeleteTeacher(teacherToDelete: Teacher): void {
      Swal.fire({
        title: `¿Está seguro de eliminar al maestro ${teacherToDelete.name}?`,
        icon: 'warning',
        iconColor:'#673ab7',
        showCancelButton: true,
        confirmButtonColor: '#673ab7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.teacherService.deleteTeacherById(teacherToDelete.id);
          Swal.fire({
            title: `Se elimino el maestro ${teacherToDelete.name}`,
            icon: 'success',
            iconColor:'#673ab7',
            confirmButtonColor: '#673ab7',
            confirmButtonText: 'Ok'}
          )
        }
      })
    }

    onEditTeacher(teacherToEdit: Teacher): void {
      this.matDialog
        .open(TeachersDialogComponent, {
          data: teacherToEdit,
        })
        .afterClosed()
        .subscribe({
          next: (teacherUpdated) => {
            if (teacherUpdated) {
              this.teacherService.updateTeacherById(teacherToEdit.id, teacherUpdated);
            }
          },
        });
    }

}
