import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/users/models';


@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    const fullName = `${user.name} ${user.lastname}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
  }

}
