import { TestBed } from "@angular/core/testing";
import { UsersDialogComponent } from "./users-dialog.component"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";




describe('UsersDialogComponent', () =>{
    let component: UsersDialogComponent;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[UsersDialogComponent],
            imports:[MatFormFieldModule, MatInputModule ],
            providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} } ]
        })
        component = TestBed.createComponent(UsersDialogComponent).componentInstance
    })


    it('Al llamar onSubmit() y el formulario es invalido, se debe llamar el metodo markAllAsTouched de la propiedad userForm', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        component.nameControl.setValue('');
        component.lastNameControl.setValue('');
    
        expect(component.userForm.invalid).toBeTrue();
    
        const spyOfMarkAllAsTouched = spyOn(component.userForm, 'markAllAsTouched');
        component.onSubmit()
    
        expect(spyOfMarkAllAsTouched).toHaveBeenCalled()
    })
    it('Al llamar onSubmit() userForm verifica si es valido, ', () => {
        const matref = TestBed.inject(MatDialogRef<UsersDialogComponent>)
        
        component.emailControl.setValue('a@email.com');
        component.passwordControl.setValue('12345678');
        component.nameControl.setValue('usuario');
        component.lastNameControl.setValue('dos');
    
        expect(component.userForm.valid).toBeTrue();
    
 
    })
})

