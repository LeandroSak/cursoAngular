import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription, InscriptionWithStudentAndCourse } from './model';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { selectInscriptions } from './store/inscription.selectors';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { InscriptionActions } from './store/inscription.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  displayedColumns = ['id', 'course', 'student'];
  inscriptions$: Observable<InscriptionWithStudentAndCourse[]>;
  public isAdmin$: Observable<boolean>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectInscriptions)
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }

}
