import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User, createUser, updateUser } from './models';

const data : User[]=[{
  id:1,
  name:"Juan",
  lastname:"Perez",
  email:"juan@email.com",
  password: "12345678"

},
{
  id:2,
  name:"Maria",
  lastname:"Molina",
  email:"maria@mail.com",
  password: "12345678"

},
{id:3,
  name:"Jose",
  lastname:"Sanchez",
  email:"jose@mail.com",
  password: "12345678"
},
{id:4,
  name:"Claudia",
  lastname:"Molina",
  email:"claudia@mail.com",
  password: "12345678"
}]

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() { }

  loadUsers():void{
    this._users$.next(data)
  }

  getUsers(): Observable<User[]> {
    return this._users$;
  }

  createUser(user: createUser): void {

    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          { ...user, id: arrayActual[arrayActual.length - 1].id + 1 },
        ]);
      },
    });}

    updateUserById(id: number, userActualizado: updateUser): void {
      this.users$.pipe(take(1)).subscribe({
        next: (arrayActual) => {
          this._users$.next(
            arrayActual.map((user) =>
            user.id === id ? { ...user, ...userActualizado } : user
            )
          );
        },
      });}


      deleteUserById(id: number): void {
        this._users$.pipe(take(1)).subscribe({
          next: (arrayActual) => {
            this._users$.next(arrayActual.filter((user) => user.id !== id));
          },
        });
      }

}
