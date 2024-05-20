import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutUserComponent } from './pages/layout/layout.component';
import { MyCollectionPageComponent } from './pages/my-collection-page/my-collection-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ComingSoonPageComponent } from '../../shared/pages/coming-soon-page/coming-soon-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutUserComponent,
    children: [
      { path: 'my-collection', component: MyCollectionPageComponent},
      { path: 'favourites', component: ComingSoonPageComponent},
      { path: 'suggestions', component: ComingSoonPageComponent},
      { path: 'shopping', component: ComingSoonPageComponent},
      { path: 'profile', component: ProfilePageComponent },

      { path: '', redirectTo: 'my-collection', pathMatch: 'full' },
      { path: '**', redirectTo: 'my-collection' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {


}
