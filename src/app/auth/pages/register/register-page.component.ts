import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from '../../../shared/services/validators/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector:     'app-register-page',
  templateUrl:  './register-page.component.html',
  styleUrl:     './register-page.component.css',

})
export class RegisterPageComponent {

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private emailValidator    = inject (EmailValidatorService);

  public myForm: FormGroup = this.fb.group({
    name:       ['', [ Validators.required,]],
    email:      ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ /*this.emailValidator*/ ]],
    password:   ['', [ Validators.required, Validators.minLength(4) ]],
    password2:  ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();

    //! Aqui se implementara el guardado a la base de datos
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      console.log(key);
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        case 'pattern':
          return 'Debe tener formato de email';
      }
    }
    return null;
  }
}
