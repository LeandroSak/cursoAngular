import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.css']
})
export class StudentsDialogComponent {
  
  title:string="Crear Estudiante"

  nameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  lastNameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  emailControl = new FormControl<string | null>(null, [Validators.required,Validators.email]);
  ageControl = new FormControl<number | null>(null, [Validators.required,Validators.min(10)]);

  studentForm = new FormGroup({
    name: this.nameControl,
    lastname: this.lastNameControl,
    email: this.emailControl,
    age: this.ageControl,
  });
  constructor(
    private dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {if (this.data) {
    this.title="Editar Estudiante";
    this.nameControl.setValue(this.data.name);
    this.lastNameControl.setValue(this.data.lastname);
    this.ageControl.setValue(this.data.age);
    this.emailControl.setValue(this.data.email);
  }}

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
  
}
