import { Component } from '@angular/core';
import { Student } from './models';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';



const data: Student[] = [
  {
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
  }
]

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  public students: Student[] = data
constructor(
  private matDialog: MatDialog,
  
) {
  }

  onCreateUser(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.students= [
              ...this.students,{
              id: this.students.length + 1,
              name: v.name,
              email: v.email,
              age: v.age,
              lastname: v.lastname,
            },]
          } 
        },
      });
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
        this.students = this.students.filter((u) => u.id !== studentToDelete.id);
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
          console.log(studentUpdated);
          if (studentUpdated) {
            this.students = this.students.map((student) => {
              return student.id === studentToEdit.id
                ? { ...student, ...studentUpdated } 
                : student; 
            });
          }
        },
      });
  }
}
