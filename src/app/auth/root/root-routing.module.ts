import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonPageComponent } from '../../shared/pages/coming-soon-page/coming-soon-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComingSoonPageComponent,
    children: [
      { path: 'default', component: ComingSoonPageComponent},
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      { path: '**', redirectTo: 'default' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
