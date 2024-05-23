import { CommonModule }                                             from '@angular/common';
import { Component, OnInit, inject }                                from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators }  from '@angular/forms';
import { Router }                                                   from '@angular/router';

import { AuthRoutingModule }  from '../../../auth-routing.module';
import { DataCollection }     from '../../../interfaces/dataCollection.interface';
import { User }               from '../../../interfaces/user.interface';
import { UserService }        from '../../../service/user.service';
import { ValidatorsService }  from '../../../../shared/services/validators.service';

@Component({
  selector:     'app-update-collection-form',
  standalone:   true,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  templateUrl:  './updateCollectionForm.component.html',
  styleUrl:     './updateCollectionForm.component.css',
})

export class UpdateCollectionFormComponent implements OnInit {
  ngOnInit(): void {
    this.user = this.userService.cacheStoreUser.user;

    if (this.user) {
      this.myForm.patchValue({
        name: this.user!.collection!.name,
        description: this.user!.collection!.description,
      });
    }

  }

  public user! : User |null;
  public formError: boolean = false;
  public errorMessage: string = '';

  private userService       = inject(UserService);
  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private router            = inject(Router);

  public myForm: FormGroup = this.fb.group({
    name:       ['', [ Validators.required,]],
    description:      ['', []],
    password:   ['', [ Validators.required, Validators.minLength(4) ]],
  });

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

  public buildCollectionFromForm(): DataCollection {
    return {
      name:             this.myForm.value.name,
      description:      this.myForm.value.description,
      number_vinyls:    this.user!.collection!.number_vinyls,
      rating:           this.user!.collection!.rating,
      public:           true,
      user_id:          this.user!.id,
    }
  }

  public updateCollection(){
    this.userService.checkAuth(this.userService.currentUser!.email, this.myForm.value.password)
    .subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
            this.userService.updateCollection(this.buildCollectionFromForm(), this.user!.collection!.id)
            .subscribe(
              collection => {
                if (collection) {
                  this.user = this.userService.currentUser;
                  this.formError = false;
                  this.myForm.controls['password'].setValue('');
                  this.router.navigate(['/user/my-collection']);
                }
              }
            );
        } else {
          this.formError = true;
          this.errorMessage = 'Contraseña incorrecta.';
        }
      })
  }
  public onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
        return;
    }
    this.updateCollection();
  }

}
