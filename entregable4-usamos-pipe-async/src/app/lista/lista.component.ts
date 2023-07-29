import { Component, OnDestroy } from '@angular/core';
import { User, UserService } from '../user.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnDestroy {
  public users : User[] = []
  public destroyed = new Subject<boolean>();
  usersss: Observable<User | undefined>;
  constructor( private userService: UserService){
    
    this.userService.loadUsers();

    this.userService.getUsers().pipe(takeUntil(this.destroyed)).subscribe({
      next:(user) =>{
        this.users=user
      }
    })

    this.usersss=this.userService.getUserById(2)
    
  }
  ngOnDestroy(): void {
    this.destroyed.next(true)
  }
  


}
