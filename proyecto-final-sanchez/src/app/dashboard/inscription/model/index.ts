import { Course } from "../../courses/models";
import { Student } from "../../students/models";



export interface Inscription {
    id: number;
    coursesId: number;
    studentId: number;
  }
  
  export interface InscriptionWithStudentAndCourse extends Inscription {
    student: Student;
    course: Course;
  }
  
  export interface CreateInscription {
    courseId: number | null;
    studentId: number | null;
  }