import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { User, updateUser } from './models';
import { UsersService } from './users.service';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public users: Observable<User[]>;

  constructor (
    private matDialog: MatDialog,
    private usersService: UsersService,
  ){
    this.usersService.loadUsers();
    this.users = this.usersService.getUsers()

  }

  onCreateUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (user) => {
          if (user) {
            this.usersService.createUser({
              name: user.name,
              email: user.email,
              lastname: user.lastname,
              password: user.password,
              role: user.role
            }) }
          } 
        },
      );
  }

  onDeleteUser(userToDelete: User): void {
    Swal.fire({
      title: `¿Está seguro de eliminar al maestro ${userToDelete.name}?`,
      icon: 'warning',
      iconColor:'#673ab7',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUserById(userToDelete.id);
        Swal.fire({
          title: `Se elimino el maestro ${userToDelete.name}`,
          icon: 'success',
          iconColor:'#673ab7',
          confirmButtonColor: '#673ab7',
          confirmButtonText: 'Ok'}
        )
      }
    })
  }

  onEditUser(userToEdit: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: userToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          if (userUpdated) {
            this.usersService.updateUserById(userToEdit.id, userUpdated, userToEdit.token);
          }
        },
      });
  }
}
