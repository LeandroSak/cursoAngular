import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/students/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: Student, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    const fullName = `${user.name} ${user.lastname}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
  }

}
