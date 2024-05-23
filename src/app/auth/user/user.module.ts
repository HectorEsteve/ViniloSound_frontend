import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { UserRoutingModule }    from './user-routing.module';

import { CreateCollectionFormComponent }  from './components/createCollectionForm/createCollectionForm.component';
import { DeleteCollectionFormComponent }  from './components/deleteCollectionForm/deleteCollectionForm.component';
import { DeleteFormComponent }            from './components/deleteForm/deleteForm.component';
import { InfoCollectionComponent }        from './components/infoCollection/infoCollection.component';
import { LayoutUserComponent }            from './pages/layout/layout.component';
import { UpdateFormComponent }            from './components/updateForm/updateForm.component';
import { VinylCardComponent }             from '../../music/components/vinyl-card/vinyl-card.component';

import { ComingSoonPageComponent }        from '../../shared/pages/coming-soon-page/coming-soon-page.component';
import { MyCollectionPageComponent }      from './pages/my-collection-page/my-collection-page.component';
import { ProfilePageComponent }           from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    LayoutUserComponent,
    MyCollectionPageComponent,
    ProfilePageComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComingSoonPageComponent,
    ReactiveFormsModule,
    UpdateFormComponent,
    DeleteFormComponent,
    CreateCollectionFormComponent,
    VinylCardComponent,
    InfoCollectionComponent,
    UpdateFormComponent,
    DeleteCollectionFormComponent

  ]
})
export class UserModule { }
