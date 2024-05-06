import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor( private fb: FormBuilder ){}

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required] ],
    password: ['', [ Validators.required, Validators.minLength(4) ] ],
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
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
      }
    }
    return null;
  }

  onSave():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }


}
