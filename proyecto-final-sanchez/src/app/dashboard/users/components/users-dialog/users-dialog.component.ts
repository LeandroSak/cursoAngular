import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent {
  title:string="Crear Usuario"

  nameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  lastNameControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  emailControl = new FormControl<string | null>(null, [Validators.required,Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]);


  userForm = new FormGroup({
    name: this.nameControl,
    lastname: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl
  });
  constructor(
    private dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {if (this.data) {
    this.title="Editar Usuario";
    this.nameControl.setValue(this.data.name);
    this.lastNameControl.setValue(this.data.lastname);
    this.emailControl.setValue(this.data.email);
    this.passwordControl.setValue(this.data.password)
  }}

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
