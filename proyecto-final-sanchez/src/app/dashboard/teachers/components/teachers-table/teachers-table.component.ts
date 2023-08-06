import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
    @Input()
    dataSource: Teacher[] = [];
  
    @Output()
  deleteTeacher = new EventEmitter<Teacher>();

  @Output()
  editTeacher = new EventEmitter<Teacher>();
}
