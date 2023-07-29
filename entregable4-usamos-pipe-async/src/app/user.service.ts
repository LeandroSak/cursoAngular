import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable,  map, take } from 'rxjs';

export interface User {
  id:number
  name:string,
  lastname:string,
  email:string,
  age:number
}




@Injectable({
  providedIn: 'root'
})
export class UserService {
    data : User[]=[{
    id:1,
    name:"Juan",
    lastname:"Perez",
    email:"juan@email.com",
    age:20
  },
  {
    id:2,
    name:"Maria",
    lastname:"Molina",
    email:"maria@mail.com",
    age:21
  },
  {id:3,
    name:"Jose",
    lastname:"Sanchez",
    email:"jose@mail.com",
    age:21},
  {id:4,
    name:"Claudia",
    lastname:"Molina",
    email:"claudia@mail.com",
    age:31}]

  private users$ = new BehaviorSubject<User[]>([]);
  private userss$ = this.users$.asObservable();

  constructor() { 
    
  }

  loadUsers():void{
    this.users$.next(this.data)
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }
  
  getUserById(id: number) {
    return this.userss$.pipe(
      take(1),
      map(( users ) =>  users.find((u) => u.id === id)),
    )
  }
}
