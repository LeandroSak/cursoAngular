import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithStudentAndCourse } from '../model';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';


export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: InscriptionWithStudentAndCourse[];
  studentOptions: Student[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  studentOptions: [],
  courseOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),


  on(InscriptionActions.loadStudentOptions, (state) => state),
  on(InscriptionActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data,
    }
  }),

  on(InscriptionActions.loadCourseOptions, (state) => state),
  on(InscriptionActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data,
    }
  })

);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});