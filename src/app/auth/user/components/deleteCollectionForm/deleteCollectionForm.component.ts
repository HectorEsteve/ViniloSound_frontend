import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthRoutingModule } from '../../../auth-routing.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/services/validators.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-delete-collection-form',
  standalone: true,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  templateUrl: './deleteCollectionForm.component.html',
  styleUrl: './deleteCollectionForm.component.css',
})
export class DeleteCollectionFormComponent implements OnInit {

  ngOnInit(): void {
    this.user = this.userService.currentUser!;
  }

  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);
  private userService       = inject(UserService);
  private router            = inject( Router );

  public user! : User | null;
  public formError: boolean = false;
  public errorMessage: string = '';


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

  public deleteCollection(){
    this.userService.checkAuth(this.myForm.value.email, this.myForm.value.password)
    .subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.userService.deleteCollection(this.userService.currentUser!.collection!.id)
          .subscribe(
            () => {
              this.formError = false;
              this.router.navigate(['/user/my-collection']);
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
    this.deleteCollection();
  }


}
