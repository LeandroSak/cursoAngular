import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleSizeDirective } from './directives/title-size.directive';
import { FullNamePipe } from './pipes/full-name.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    TitleSizeDirective,
    FullNamePipe,
    ControlErrorMessagePipe,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    FullNamePipe,
    TitleSizeDirective,
    ControlErrorMessagePipe,
    MatSelectModule
  ]
})
export class SharedModule { }
