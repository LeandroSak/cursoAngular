import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/dashboard/courses/models';
import { Student } from 'src/app/dashboard/students/models';
import { selectCourseOptions, selectStudentOptions } from '../../store/inscription.selectors';
import { InscriptionActions } from '../../store/inscription.actions';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrls: ['./inscription-dialog.component.css']
})
export class InscriptionDialogComponent {

  courseIdControl = new FormControl(null, Validators.required);
  studentIdControl = new FormControl(null, Validators.required);

  inscriptionForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl,
  });

  studentOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
    this.studentOptions$ = this.store.select(selectStudentOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadCourseOptions());
    this.store.dispatch(InscriptionActions.loadStudentOptions());
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionActions.createInscription({ payload: this.inscriptionForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }

}
