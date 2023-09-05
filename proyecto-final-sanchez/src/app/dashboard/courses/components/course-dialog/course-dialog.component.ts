import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent {

  title:string="Crear Curso"

  nameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);

  courseForm = new FormGroup({
    name: this.nameControl,

  });

  constructor(
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {if (this.data) {
    this.title="Editar Curso";
    this.nameControl.setValue(this.data.name);

  }}

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
