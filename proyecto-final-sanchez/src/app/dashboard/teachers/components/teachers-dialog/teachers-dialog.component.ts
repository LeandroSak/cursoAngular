import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../models';

@Component({
  selector: 'app-teachers-dialog',
  templateUrl: './teachers-dialog.component.html',
  styleUrls: ['./teachers-dialog.component.css']
})
export class TeachersDialogComponent {


  title:string="Crear Profesor"

  nameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  lastNameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  emailControl = new FormControl<string | null>(null, [Validators.required,Validators.email]);


  teacherForm = new FormGroup({
    name: this.nameControl,
    lastname: this.lastNameControl,
    email: this.emailControl,
  });
  constructor(
    private dialogRef: MatDialogRef<TeachersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Teacher
  ) {if (this.data) {
    this.title="Editar Maestro";
    this.nameControl.setValue(this.data.name);
    this.lastNameControl.setValue(this.data.lastname);
    this.emailControl.setValue(this.data.email);
  }}

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.teacherForm.value);
    }
  }
}
