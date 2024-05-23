import { Component, inject }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';

import { DataUser }               from '../../interfaces/dataUser.interface';
import { EmailValidatorService }  from '../../../shared/services/validators/email-validator.service';
import { UserService }            from '../../service/user.service';
import { ValidatorsService }      from '../../../shared/services/validators.service';

@Component({
  selector:     'app-register-page',
  templateUrl:  './register-page.component.html',
  styleUrl:     './register-page.component.css',

})
export class RegisterPageComponent {

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private emailValidator    = inject (EmailValidatorService);
  private userService       = inject(UserService);
  private router            = inject( Router );

  showSuccessMessage: boolean = false;

  public myForm: FormGroup = this.fb.group({
    name:       ['', [ Validators.required,]],
    email:      ['', {
      validators: [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],
      asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
    }],
    password:   ['', [ Validators.required, Validators.minLength(4) ]],
    password2:  ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  public isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  public getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        case 'pattern':
          return 'Debe tener formato de email';
          case 'emailTaken':
        return 'Este correo electrónico ya está en uso';
      }
    }
    return null;
  }

  public buildUserFromForm(): DataUser {
    return {
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    }
  }

  public onSubmit() {
    this.myForm.markAllAsTouched();

    if ( this.myForm.invalid || !this.emailValidator.emailValidation ) {
      return;
    }
    this.userService.createUser(this.buildUserFromForm()).
    subscribe(
      (response: { message: string, users: any[] }) => {
        this.showSuccessMessage = true;
        this.loginUser(this.myForm.value.email, this.myForm.value.password);
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/']);
          }, 3000);
      })
  }

  public loginUser(email: string, password: string): void {
    this.userService.login(email, password)
      .subscribe();
  }
}
