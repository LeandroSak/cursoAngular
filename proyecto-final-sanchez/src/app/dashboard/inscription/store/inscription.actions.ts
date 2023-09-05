import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateInscription, Inscription, InscriptionWithStudentAndCourse } from '../model';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithStudentAndCourse[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{ data: Student[] }>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: CreateInscription }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});