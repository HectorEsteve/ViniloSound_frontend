import { CommonModule }                                             from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject }          from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators }  from '@angular/forms';
import { of }                                                       from 'rxjs';

import { AuthRoutingModule }      from '../../../auth-routing.module';
import { DataUser }               from '../../../interfaces/dataUser.interface';
import { EmailValidatorService }  from '../../../../shared/services/validators/email-validator.service';
import { User }                   from '../../../interfaces/user.interface';
import { UserService }            from '../../../service/user.service';
import { ValidatorsService }      from '../../../../shared/services/validators.service';

@Component({
  selector:     'app-update-form',
  standalone:   true,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  templateUrl:  './updateForm.component.html',
  styleUrl:     './updateForm.component.css',
})

export class UpdateFormComponent implements OnInit{
  ngOnInit(): void {
    this.user = this.userService.cacheStoreUser.user;

    if (this.user) {
      this.myForm.patchValue({
        name: this.user.name,
        email: this.user.email,
      });
    }
  }

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private emailValidator    = inject (EmailValidatorService);
  private userService       = inject(UserService);


  public user! : User | null;
  public showPassword: Boolean = false;
  public formError: boolean = false;
  public errorMessage: string = '';

  public changePasswordView(): void {
    this.showPassword =!this.showPassword;
  }

  public myForm: FormGroup = this.fb.group({
    name:       ['', [ Validators.required,]],
    email:      ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password:   ['', [ Validators.required, Validators.minLength(4) ]],
  });

  public setupAsyncValidators(): void {
     this.myForm.get('email')?.setAsyncValidators(
      this.user && this.user.email != this.myForm.value.email ?
      this.emailValidator.validate.bind(this.emailValidator) : (() => of(null))
    );
    this.myForm.get('email')?.updateValueAndValidity();
  }

  public passwordForm: FormGroup = this.fb.group({
    password:   ['', [ Validators.required, Validators.minLength(4) ]],
    password2:  ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  public isValidField( form:FormGroup , field: string ) {
    return this.validatorsService.isValidField( form, field );
  }

  public getFieldError( form:FormGroup , field: string ): string | null {
    if ( !form.controls[field] ) return null;
    const errors = form.controls[field].errors || {};
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

  public buildUserFromForm( form : FormGroup  ): DataUser {
    return {
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      password: form.value.password,
    }
  }

  public valuesChange(): boolean {
    if(this.myForm.value.name === this.user!.name &&
      this.myForm.value.email === this.user!.email &&
      this.passwordForm.value.password === ''
    ){
      this.formError = true;
      this.errorMessage = 'No se han modificado los datos';
      return false;
    }else{
      this.formError = false;
      return true;
    }
  }

  public updateUser(form : FormGroup){
    this.userService.checkAuth(this.userService.currentUser!.email, this.myForm.value.password)
    .subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.userService.updateUser(this.buildUserFromForm(form), this.userService.currentUser!.id)
          .subscribe(
            () => {
              this.user=this.userService.currentUser;
              this.formError = false;
              this.myForm.controls['password'].setValue('');
              this.passwordForm.controls['password'].setValue('');
              this.passwordForm.controls['password2'].setValue('');
              this.onCancelEdit();
              this.userUpdated.emit(this.user!);
            });
        } else {
          this.formError = true;
          this.errorMessage = 'Contraseña incorrecta.';
        }
      })
  }

  public onSubmit(): void {
    this.myForm.markAllAsTouched();

    if(!this.valuesChange())return;

    if(this.user!.email !== this.myForm.value.email){
      if (this.myForm.invalid || (!this.emailValidator.emailValidation)) return;
    }else{
      if (this.myForm.invalid) return;
    }

    if(this.showPassword === false){
      this.updateUser(this.myForm);
    }else{
      this.passwordForm.markAllAsTouched();
      if (this.passwordForm.invalid) return;
      this.updateUser(this.passwordForm);
    }
  }

  @Output()
  public cancel = new EventEmitter <void> ();
  @Output()
  public userUpdated = new EventEmitter<User>();

  public onCancelEdit() {
    this.cancel.emit();
  }
}
