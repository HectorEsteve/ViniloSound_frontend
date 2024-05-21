import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutUserComponent } from './pages/layout/layout.component';
import { MyCollectionPageComponent } from './pages/my-collection-page/my-collection-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ComingSoonPageComponent } from '../../shared/pages/coming-soon-page/coming-soon-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFormComponent } from './components/updateForm/updateForm.component';
import { DeleteFormComponent } from './components/deleteForm/deleteForm.component';
import { CreateCollectionFormComponent } from './components/createCollectionForm/createCollectionForm.component';


@NgModule({
  declarations: [
    LayoutUserComponent,
    MyCollectionPageComponent,
    ProfilePageComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComingSoonPageComponent,
    ReactiveFormsModule,
    UpdateFormComponent,
    DeleteFormComponent,
    CreateCollectionFormComponent

  ]
})
export class UserModule { }
