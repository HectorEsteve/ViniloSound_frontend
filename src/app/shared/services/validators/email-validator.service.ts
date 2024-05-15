import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { UserService } from '../../../auth/service/user.service';
import { User } from '../../../auth/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

  private userService = inject( UserService );

  public emailValidation: boolean = false;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    this.emailValidation = false;

    return this.userService.getUsers().pipe(
      map((response: { message: string, users: User[] }) => {
        const users = response.users;
        const emailTaken = users.some(user => user.email === email);
        this.emailValidation = true;
        return emailTaken ? { emailTaken: true } : null;
      })
    );

  }


}



