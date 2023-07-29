import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  public users : User[] = []
  usersss: Observable<User | undefined>;
  constructor( private userService: UserService){
    
    this.userService.loadUsers();

    this.userService.getUsers().subscribe({
      next:(user) =>{
        this.users=user
      }
    })

    this.usersss=this.userService.getUserById(2)
    
    
  }
  


}
