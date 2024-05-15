import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector:     'app-login',
  templateUrl:  './login-page.component.html',
  styleUrl:     './login-page.component.css',
})
export class LoginPageComponent {

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private userService       = inject(UserService);
  private router            = inject( Router );

  loginError: boolean = false;
  errorMessage: string = '';
  showSuccessMessage: boolean = false;

  public myForm: FormGroup = this.fb.group({
    email:    ['', [ Validators.required,Validators.pattern( this.validatorsService.emailPattern )] ],
    password: ['', [ Validators.required, Validators.minLength(4) ] ],
  })

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getFieldError( field: string ): string | null {
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
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.myForm.value;
    this.userService.login(email, password)
      .subscribe(
        response => {
          if (!response.user) {
            this.loginError = true;
            this.errorMessage = 'Email o contraseña incorrectos';
          } else {
            this.loginError = false;
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.showSuccessMessage = false;
              this.router.navigate(['/']);
              }, 3000);
          }
        },
      );
  }


}
