import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ValidatorsService } from '../../../../shared/services/validators.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';
import { AuthRoutingModule } from '../../../auth-routing.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-form',
  standalone: true,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  templateUrl: './deleteForm.component.html',
  styleUrl: './deleteForm.component.css',
})
export class DeleteFormComponent implements OnInit {

  ngOnInit(): void {
    this.user = this.userService.cacheStoreUser.user;
  }

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private userService       = inject(UserService);
  private router            = inject( Router );

  public user! : User | null;
  public showPassword: Boolean = false;
  public formError: boolean = false;
  public errorMessage: string = '';
  //public showSuccessMessage: boolean = false;

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

  public deleteUser(){
    this.userService.checkAuth(this.myForm.value.email, this.myForm.value.password)
    .subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.userService.deleteUser(this.userService.currentUser!.id)
          .subscribe(
            () => {
              this.formError = false;
              this.userService.resetFromLocalStorage();
              this.router.navigate(['/']);
            });
        } else {
          this.formError = true;
          this.errorMessage = 'Datos de usuario incorrectos.';
        }
      })
  }

  public onSubmit(): void {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      return;
    }
    this.deleteUser();
  }

  @Output()
  public cancel = new EventEmitter <void> ();

  onCancelDelete() {
    this.cancel.emit();
  }


}
