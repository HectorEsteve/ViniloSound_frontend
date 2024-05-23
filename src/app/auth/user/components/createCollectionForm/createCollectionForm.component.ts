import { CommonModule }                                             from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject }          from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators }  from '@angular/forms';

import { AuthRoutingModule }  from '../../../auth-routing.module';
import { CollectionService }  from '../../../../music/services/collection.service';
import { DataCollection }     from '../../../interfaces/dataCollection.interface';
import { User }               from '../../../interfaces/user.interface';
import { UserService }        from '../../../service/user.service';
import { ValidatorsService }  from '../../../../shared/services/validators.service';

@Component({
  selector: 'app-create-collection-form',
  standalone: true,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],

  templateUrl: './createCollectionForm.component.html',
  styleUrl: './createCollectionForm.component.css',
})

export class CreateCollectionFormComponent implements OnInit {
  ngOnInit(): void {

    if(this.userService.currentUser){
      this.userService.getUser(this.userService.currentUser.id).subscribe(
        response => {
          this.user = response.user;
          if(this.user!.collection) {
            this.existsCollection = true;
          }
        });
    }
  }

  public existsCollection: boolean = false;
  public user! : User |null;

  private userService       = inject(UserService);
  private collectionService = inject(CollectionService);
  private validatorsService = inject(ValidatorsService);
  private fb                = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name:       ['', [ Validators.required,]],
    description:      ['', []],
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
      }
    }
    return null;
  }

  public buildCollectionFromForm(): DataCollection {
    return {
      name:             this.myForm.value.name,
      description:      this.myForm.value.description,
      number_vinyls:    0,
      rating:           0,
      public:           true,
      user_id:          this.user!.id,
    }
  }

  public onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
        return;
    }

    this.userService.addCollection(this.buildCollectionFromForm(), this.user!)
        .subscribe(updatedUser => {
            this.user = updatedUser;
            this.userUpdated.emit(this.user);
            this.onExitEdit();
        });
}

  @Output()
  public exit = new EventEmitter <void> ();
  @Output()
  public userUpdated = new EventEmitter<User>();

  public onExitEdit() {
    this.exit.emit();
  }
}
