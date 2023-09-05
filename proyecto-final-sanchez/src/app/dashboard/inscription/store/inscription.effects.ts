import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscription, Inscription, InscriptionWithStudentAndCourse } from '../model';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';
import { environment } from 'src/app/environment/environment';

@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.getInscriptionsFromDB().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadStudentOptions),
      concatMap(() =>
        this.getStudentOptions().pipe(
          map(data => InscriptionActions.loadStudentOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadCourseOptions),
      concatMap(() =>
        this.getCourseOptions().pipe(
          map(data => InscriptionActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });


  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.createInscription(action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionActions.createInscriptionFailure({ error }))))
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });



  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getInscriptionsFromDB(): Observable<InscriptionWithStudentAndCourse[]> {
    return this.httpClient.get<InscriptionWithStudentAndCourse[]>(environment.baseUrl +'inscriptions?_expand=course&_expand=student')
  }

  private getStudentOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseUrl +'students')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseUrl +'courses');
  }

  private createInscription(payload: CreateInscription): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseUrl +'inscriptions', payload)
  }


}