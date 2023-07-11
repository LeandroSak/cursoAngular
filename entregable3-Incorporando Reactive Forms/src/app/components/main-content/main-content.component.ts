import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



interface UserModel {
  email: FormControl<string | null>;
  nombre: FormControl<string | null>;
  apellido: FormControl<string | null>;
}
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})



export class MainContentComponent {
  
  
 
   emailControl = new FormControl('', [Validators.required]);
   nombreControl = new FormControl('',[Validators.required]);
   apellidoControl = new FormControl('', [Validators.required]);
 
   userModel: FormGroup<UserModel> = new FormGroup({
     email: this.emailControl,
     nombre: this.nombreControl,
     apellido: this.apellidoControl,
    
   });

   public users : Array<UserModel>=[]

   onSubmit(user : FormGroup) {
      this.users.push(user.value)
      console.log(this.users)
  }
}

