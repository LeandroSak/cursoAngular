import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser, selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './users/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public authUser$: Observable<User | null>;
  public selectIsAdmin$: Observable<boolean>;
 constructor(private router: Router,  private authService: AuthService, private store: Store)
 {
  this.authUser$ = this.store.select(selectAuthUser);
  this.selectIsAdmin$ = this.store.select(selectIsAdmin);
 }
 logout(): void {
  this.authService.logout();
  this.router.navigate(['auth', 'login'], {})
}
}
