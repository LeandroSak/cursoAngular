import { Injectable } from '@angular/core';
import { LoginData } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthUser } from "../store/auth/auth.selectors";
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public authUser$ = this.store.select(selectAuthUser);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseUrl +'users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {
        if (usersResult.length) {
          const authUser = usersResult[0];
          this.store.dispatch(AuthActions.setAuthUser({ userData: authUser }));
        }
        return !!usersResult.length
      })
    )
  }



  login(payload: LoginData): void {
    this.httpClient.get<User[]>(environment.baseUrl +'users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({ userData: authUser }));
          this.router.navigate(['/dashboard/home']);
          localStorage.setItem('token', authUser.token);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email o contrasena invalida',
            confirmButtonColor: '#673ab7'
          })
          this.store.dispatch(AuthActions.setAuthUser({ userData: null }));
        }
      },
      error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al logearse',
            confirmButtonColor: '#673ab7'
          })
        
      }
    })
  }

  logout(): void {
    this.store.dispatch(AuthActions.setAuthUser({ userData: null }))
    localStorage.clear()
  }
}
