import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { User, createUser, updateUser } from './models';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/tokenGenerate';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  loadUsers(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users', {
    }).subscribe({
      next: (response) => {
        this._users$.next(response);
      }, error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los usuarios',
          confirmButtonColor: '#673ab7'
        })
      }
    })
  }

  getUsers(): Observable<User[]> {
    //return this.users$;
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  createUser(user: createUser): void {
    const token = generateRandomString(20);
    this.httpClient.post<User>('http://localhost:3000/users', { ...user, token })
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
      })
  }

  updateUserById(id: number, userActualizado: updateUser): void {
    this.httpClient.put('http://localhost:3000/users/' + id, userActualizado).subscribe({
      next: () => this.loadUsers(),
    })
  }

  deleteUserById(id: number): void {
    this.httpClient.delete('http://localhost:3000/users/' + id)
      .subscribe({
        next: () => this.loadUsers(),
      })
  }


}
