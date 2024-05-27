import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { RootLayoutPageComponent }  from './pages/root-layout-page/root-layout-page.component';
import { RootUsersPageComponent }   from './pages/root-users-page/root-users-page.component';
import { RootRolesPageComponent }   from './pages/root-roles-page/root-roles-page.component';

const routes: Routes = [
  {
    path: '',
    component: RootLayoutPageComponent,
    children: [
      { path: 'users', component: RootUsersPageComponent},
      { path: 'roles', component: RootRolesPageComponent},

      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
