import { Injectable } from '@angular/core';
import { LoginData } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/users/models/index";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {
        return !!usersResult.length
      })
    )
  }
  login(payload: LoginData): void {
    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];

          this._authUser$.next(authUser);
          this.router.navigate(['/dashboard/home']);
          localStorage.setItem('token', authUser.token);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email o contrasena invalida',
            confirmButtonColor: '#673ab7'
          })
          this._authUser$.next(null);
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
    localStorage.clear()
  }
}
