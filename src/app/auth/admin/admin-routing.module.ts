import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { AdminGenrePageComponent } from './pages/admin-genre-page/admin-genre-page.component';
import { AdminFormatPageComponent } from './pages/admin-format-page/admin-format-page.component';
import { AdminRecordCompaniePageComponent } from './pages/admin-record-companie-page/admin-record-company-page.component';
import { AdminBandPageComponent } from './pages/admin-band-page/admin-band-page.component';
import { AdminSongPageComponent } from './pages/admin-song-page/admin-song-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutPageComponent,
    children: [
      { path: 'users', component: AdminUsersPageComponent},
      { path: 'genres', component: AdminGenrePageComponent},
      { path: 'formats', component: AdminFormatPageComponent},
      { path: 'record-companies', component: AdminRecordCompaniePageComponent},
      { path: 'bands', component: AdminBandPageComponent},
      { path: 'songs', component: AdminSongPageComponent},

      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
