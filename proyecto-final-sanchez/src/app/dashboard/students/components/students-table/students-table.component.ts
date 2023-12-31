import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {

  public isAdmin$: Observable<boolean>;

  constructor( private store: Store) {
   
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
    displayedColumns: string[] = ['id', 'fullName', 'age', 'email', 'actions'];
    @Input()
    dataSource: Student[] = [];
  
    @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
